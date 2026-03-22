package geral.official.arte.ui

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Bitmap
import android.net.ConnectivityManager
import android.net.Uri
import android.os.Bundle
import android.view.KeyEvent
import android.view.View
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import geral.official.arte.R
import geral.official.arte.databinding.ActivityMainBinding
import geral.official.arte.util.NetworkUtil
import geral.official.arte.util.UpdateChecker
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private val baseHost = "officialarte.vercel.app"
    private var networkCallback: ConnectivityManager.NetworkCallback? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupWebView()
        setupOfflineRetry()
        registerNetworkListener()

        if (NetworkUtil.isOnline(this)) {
            binding.webView.loadUrl(getString(R.string.base_url))
            checkForUpdates()
        } else {
            showOffline()
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView() {
        binding.webView.apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.cacheMode = WebSettings.LOAD_DEFAULT
            settings.mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            settings.setSupportZoom(false)
            settings.useWideViewPort = true
            settings.loadWithOverviewMode = true
            settings.mediaPlaybackRequiresUserGesture = false
            settings.allowFileAccess = false
            settings.allowContentAccess = false

            webViewClient = object : WebViewClient() {

                override fun shouldOverrideUrlLoading(
                    view: WebView?,
                    request: WebResourceRequest?
                ): Boolean {
                    val url = request?.url ?: return false
                    return if (url.host == baseHost) {
                        false // Let WebView handle same-domain
                    } else {
                        // Open external URLs in browser
                        startActivity(Intent(Intent.ACTION_VIEW, url))
                        true
                    }
                }

                override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                    super.onPageStarted(view, url, favicon)
                    binding.progressBar.visibility = View.VISIBLE
                }

                override fun onPageFinished(view: WebView?, url: String?) {
                    super.onPageFinished(view, url)
                    binding.progressBar.visibility = View.GONE
                    showWebView()
                }

                override fun onReceivedError(
                    view: WebView?,
                    request: WebResourceRequest?,
                    error: WebResourceError?
                ) {
                    if (request?.isForMainFrame == true && !NetworkUtil.isOnline(this@MainActivity)) {
                        showOffline()
                    }
                }
            }

            webChromeClient = object : WebChromeClient() {
                override fun onProgressChanged(view: WebView?, newProgress: Int) {
                    binding.progressBar.progress = newProgress
                }
            }
        }
    }

    private fun setupOfflineRetry() {
        binding.btnRetry.setOnClickListener {
            if (NetworkUtil.isOnline(this)) {
                showWebView()
                binding.webView.loadUrl(getString(R.string.base_url))
            }
        }
    }

    private fun showOffline() {
        binding.offlineLayout.visibility = View.VISIBLE
        binding.webView.visibility = View.GONE
        binding.progressBar.visibility = View.GONE
    }

    private fun showWebView() {
        binding.offlineLayout.visibility = View.GONE
        binding.webView.visibility = View.VISIBLE
    }

    private fun registerNetworkListener() {
        networkCallback = NetworkUtil.registerCallback(
            this,
            onAvailable = {
                runOnUiThread {
                    if (binding.offlineLayout.visibility == View.VISIBLE) {
                        showWebView()
                        binding.webView.loadUrl(getString(R.string.base_url))
                    }
                }
            },
            onLost = {
                runOnUiThread { showOffline() }
            }
        )
    }

    private fun checkForUpdates() {
        lifecycleScope.launch {
            UpdateChecker.check(this@MainActivity)
        }
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        if (keyCode == KeyEvent.KEYCODE_BACK && binding.webView.canGoBack()) {
            binding.webView.goBack()
            return true
        }
        return super.onKeyDown(keyCode, event)
    }

    override fun onDestroy() {
        networkCallback?.let { NetworkUtil.unregisterCallback(this, it) }
        binding.webView.destroy()
        super.onDestroy()
    }
}

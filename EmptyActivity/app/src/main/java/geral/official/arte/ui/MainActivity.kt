package geral.official.arte.ui

import android.Manifest
import android.annotation.SuppressLint
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.net.ConnectivityManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.view.KeyEvent
import android.view.View
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
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

    private val notificationPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { /* granted or denied – no extra action needed */ }

    companion object {
        private const val PREF_NAME = "officialarte_prefs"
        private const val KEY_NOTIF_ASKED = "notification_permission_asked"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupWebView()
        setupSwipeRefresh()
        setupOfflineRetry()
        setupErrorRetry()
        setupMenu()
        registerNetworkListener()
        askNotificationPermission()

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
                        false
                    } else {
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
                    binding.swipeRefresh.isRefreshing = false
                    showWebView()
                }

                override fun onReceivedError(
                    view: WebView?,
                    request: WebResourceRequest?,
                    error: WebResourceError?
                ) {
                    if (request?.isForMainFrame == true) {
                        // Stop the default error page from showing
                        view?.stopLoading()
                        view?.loadUrl("about:blank")

                        binding.swipeRefresh.isRefreshing = false

                        if (!NetworkUtil.isOnline(this@MainActivity)) {
                            showOffline()
                        } else {
                            showServerError()
                        }
                    }
                }

                @Deprecated("Deprecated in Java")
                override fun onReceivedError(
                    view: WebView?,
                    errorCode: Int,
                    description: String?,
                    failingUrl: String?
                ) {
                    // For API < 23
                    view?.stopLoading()
                    view?.loadUrl("about:blank")

                    binding.swipeRefresh.isRefreshing = false

                    if (!NetworkUtil.isOnline(this@MainActivity)) {
                        showOffline()
                    } else {
                        showServerError()
                    }
                }

                override fun onReceivedHttpError(
                    view: WebView?,
                    request: WebResourceRequest?,
                    errorResponse: android.webkit.WebResourceResponse?
                ) {
                    if (request?.isForMainFrame == true) {
                        val statusCode = errorResponse?.statusCode ?: 0
                        if (statusCode >= 500) {
                            view?.stopLoading()
                            view?.loadUrl("about:blank")
                            binding.swipeRefresh.isRefreshing = false
                            showServerError()
                        }
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

    private fun setupSwipeRefresh() {
        binding.swipeRefresh.setColorSchemeResources(R.color.accent)
        binding.swipeRefresh.setProgressBackgroundColorSchemeResource(R.color.background_dark)
        binding.swipeRefresh.setOnRefreshListener {
            if (NetworkUtil.isOnline(this)) {
                binding.webView.reload()
            } else {
                binding.swipeRefresh.isRefreshing = false
                showOffline()
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

    private fun setupErrorRetry() {
        binding.btnRetryError.setOnClickListener {
            if (NetworkUtil.isOnline(this)) {
                showWebView()
                binding.webView.loadUrl(getString(R.string.base_url))
            } else {
                showOffline()
            }
        }
    }

    private fun setupMenu() {
        binding.btnMenu.setOnClickListener {
            binding.menuOverlay.visibility = View.VISIBLE
        }

        binding.menuOverlay.setOnClickListener {
            binding.menuOverlay.visibility = View.GONE
        }

        binding.menuCheckUpdate.setOnClickListener {
            binding.menuOverlay.visibility = View.GONE
            lifecycleScope.launch {
                UpdateChecker.check(this@MainActivity, silent = false)
            }
        }

        binding.menuAbout.setOnClickListener {
            binding.menuOverlay.visibility = View.GONE
            binding.webView.loadUrl(getString(R.string.about_url))
        }

        binding.menuDeveloper.setOnClickListener {
            binding.menuOverlay.visibility = View.GONE
            startActivity(Intent(this, DeveloperActivity::class.java))
        }

        binding.menuClose.setOnClickListener {
            binding.menuOverlay.visibility = View.GONE
        }
    }

    private fun showOffline() {
        binding.offlineLayout.visibility = View.VISIBLE
        binding.errorLayout.visibility = View.GONE
        binding.swipeRefresh.visibility = View.GONE
        binding.progressBar.visibility = View.GONE
        binding.btnMenu.visibility = View.GONE
    }

    private fun showServerError() {
        binding.errorLayout.visibility = View.VISIBLE
        binding.offlineLayout.visibility = View.GONE
        binding.swipeRefresh.visibility = View.GONE
        binding.progressBar.visibility = View.GONE
        binding.btnMenu.visibility = View.GONE
    }

    private fun showWebView() {
        binding.offlineLayout.visibility = View.GONE
        binding.errorLayout.visibility = View.GONE
        binding.swipeRefresh.visibility = View.VISIBLE
        binding.btnMenu.visibility = View.VISIBLE
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
            UpdateChecker.check(this@MainActivity, silent = true)
        }
    }

    private fun askNotificationPermission() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) return

        val prefs = getSharedPreferences(PREF_NAME, MODE_PRIVATE)
        if (prefs.getBoolean(KEY_NOTIF_ASKED, false)) return

        prefs.edit().putBoolean(KEY_NOTIF_ASKED, true).apply()

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
            == PackageManager.PERMISSION_GRANTED
        ) return

        AlertDialog.Builder(this, R.style.Theme_OfficialArte_Dialog)
            .setTitle("Ativar Notificações")
            .setMessage("Gostaria de receber novidades sobre arte, cultura e lançamentos exclusivos do OfficialArte?")
            .setPositiveButton("Ativar") { _, _ ->
                notificationPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
            }
            .setNegativeButton("Agora não", null)
            .setCancelable(true)
            .show()
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            if (binding.menuOverlay.visibility == View.VISIBLE) {
                binding.menuOverlay.visibility = View.GONE
                return true
            }
            if (binding.webView.canGoBack()) {
                binding.webView.goBack()
                return true
            }
        }
        return super.onKeyDown(keyCode, event)
    }

    override fun onDestroy() {
        networkCallback?.let { NetworkUtil.unregisterCallback(this, it) }
        binding.webView.destroy()
        super.onDestroy()
    }
}

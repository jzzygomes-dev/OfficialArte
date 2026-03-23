package geral.official.arte.ui

import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.animation.ValueAnimator
import android.annotation.SuppressLint
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.view.View
import android.view.animation.OvershootInterpolator
import android.view.animation.DecelerateInterpolator
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.animation.doOnEnd
import geral.official.arte.R
import geral.official.arte.databinding.ActivitySplashBinding
import java.security.MessageDigest

class SplashActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySplashBinding

    private val validSignature = "01bc885ca0bf517a733b4227be8dc3edf78a72de01a3d8e199f573ec2e22d7d7"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySplashBinding.inflate(layoutInflater)
        setContentView(binding.root)

        if (!verifySignature()) {
            showTamperedDialog()
            return
        }

        startAnimations()
    }

    @SuppressLint("PackageManagerGetSignatures")
    private fun verifySignature(): Boolean {
        return try {
            val signatures = if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.P) {
                val info = packageManager.getPackageInfo(packageName, PackageManager.GET_SIGNING_CERTIFICATES)
                info.signingInfo?.apkContentsSigners
            } else {
                @Suppress("DEPRECATION")
                val info = packageManager.getPackageInfo(packageName, PackageManager.GET_SIGNATURES)
                @Suppress("DEPRECATION")
                info.signatures
            }

            if (signatures.isNullOrEmpty()) return false

            val cert = signatures[0].toByteArray()
            val md = MessageDigest.getInstance("SHA-256")
            val digest = md.digest(cert)
            val hex = digest.joinToString("") { "%02x".format(it) }

            hex.equals(validSignature, ignoreCase = true)
        } catch (_: Exception) {
            false
        }
    }

    private fun showTamperedDialog() {
        AlertDialog.Builder(this)
            .setTitle(getString(R.string.tampered_app))
            .setMessage(getString(R.string.tampered_message))
            .setCancelable(false)
            .setPositiveButton(getString(R.string.ok)) { _, _ ->
                finishAffinity()
            }
            .show()
    }

    private fun startAnimations() {
        val logo = binding.splashLogo
        val title = binding.splashTitle
        val line = binding.accentLine
        val glow = binding.glowCircle
        val progress = binding.splashProgress

        val logoScaleX = ObjectAnimator.ofFloat(logo, View.SCALE_X, 0.6f, 1f).apply {
            duration = 700
            interpolator = OvershootInterpolator(2f)
        }
        val logoScaleY = ObjectAnimator.ofFloat(logo, View.SCALE_Y, 0.6f, 1f).apply {
            duration = 700
            interpolator = OvershootInterpolator(2f)
        }
        val logoAlpha = ObjectAnimator.ofFloat(logo, View.ALPHA, 0f, 1f).apply {
            duration = 500
        }

        val glowAlpha = ObjectAnimator.ofFloat(glow, View.ALPHA, 0f, 0.7f).apply {
            duration = 800
        }
        val glowPulse = ObjectAnimator.ofFloat(glow, View.ALPHA, 0.7f, 0.3f).apply {
            duration = 1000
            repeatCount = ValueAnimator.INFINITE
            repeatMode = ValueAnimator.REVERSE
        }

        val titleAlpha = ObjectAnimator.ofFloat(title, View.ALPHA, 0f, 1f).apply {
            duration = 500
            startDelay = 400
        }
        val titleTransY = ObjectAnimator.ofFloat(title, View.TRANSLATION_Y, 30f, 0f).apply {
            duration = 500
            startDelay = 400
            interpolator = DecelerateInterpolator()
        }

        val lineAnim = ValueAnimator.ofInt(0, 60.dpToPx()).apply {
            duration = 400
            startDelay = 700
            interpolator = DecelerateInterpolator()
            addUpdateListener {
                val params = line.layoutParams
                params.width = it.animatedValue as Int
                line.layoutParams = params
            }
        }

        val progressAlpha = ObjectAnimator.ofFloat(progress, View.ALPHA, 0f, 1f).apply {
            duration = 300
            startDelay = 900
        }

        val set = AnimatorSet()
        set.playTogether(
            logoScaleX, logoScaleY, logoAlpha,
            glowAlpha, titleAlpha, titleTransY, lineAnim, progressAlpha
        )
        set.doOnEnd {
            glowPulse.start()
        }
        set.start()

        logo.postDelayed({
            startActivity(Intent(this, MainActivity::class.java))
            overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out)
            finish()
        }, 2200)
    }

    private fun Int.dpToPx(): Int {
        return (this * resources.displayMetrics.density).toInt()
    }
}

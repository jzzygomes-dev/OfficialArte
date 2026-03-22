package geral.official.arte.ui

import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.animation.ValueAnimator
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.view.animation.OvershootInterpolator
import android.view.animation.DecelerateInterpolator
import androidx.appcompat.app.AppCompatActivity
import androidx.core.animation.doOnEnd
import geral.official.arte.databinding.ActivitySplashBinding

class SplashActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySplashBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySplashBinding.inflate(layoutInflater)
        setContentView(binding.root)
        startAnimations()
    }

    private fun startAnimations() {
        val logo = binding.splashLogo
        val title = binding.splashTitle
        val line = binding.accentLine
        val glow = binding.glowCircle
        val progress = binding.splashProgress

        // Logo: scale up + fade in
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

        // Glow pulse
        val glowAlpha = ObjectAnimator.ofFloat(glow, View.ALPHA, 0f, 0.7f).apply {
            duration = 800
        }
        val glowPulse = ObjectAnimator.ofFloat(glow, View.ALPHA, 0.7f, 0.3f).apply {
            duration = 1000
            repeatCount = ValueAnimator.INFINITE
            repeatMode = ValueAnimator.REVERSE
        }

        // Title: slide up + fade in
        val titleAlpha = ObjectAnimator.ofFloat(title, View.ALPHA, 0f, 1f).apply {
            duration = 500
            startDelay = 400
        }
        val titleTransY = ObjectAnimator.ofFloat(title, View.TRANSLATION_Y, 30f, 0f).apply {
            duration = 500
            startDelay = 400
            interpolator = DecelerateInterpolator()
        }

        // Accent line: width expand
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

        // Progress indicator
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

        // Navigate after delay
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

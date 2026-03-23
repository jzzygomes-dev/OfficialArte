package geral.official.arte.util

import android.app.Activity
import android.app.Dialog
import android.content.Intent
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.net.Uri
import android.view.Window
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import geral.official.arte.R
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.net.URL

object UpdateChecker {

    private const val VERSION_URL = "https://officialarte.vercel.app/version.json"

    data class VersionInfo(
        val version: String,
        val changelog: String,
        val force: Boolean,
        val apkUrl: String,
        val minSupported: String
    )

    suspend fun check(activity: Activity, silent: Boolean = true) {
        try {
            val remote = fetchVersion() ?: run {
                if (!silent) withContext(Dispatchers.Main) { showNoUpdateDialog(activity) }
                return
            }

            val currentVersion = activity.packageManager
                .getPackageInfo(activity.packageName, 0)
                .versionName ?: "0.0.0"

            val comparison = compareVersions(remote.version, currentVersion)
            val isBelowMin = compareVersions(currentVersion, remote.minSupported) < 0

            if (comparison > 0) {
                withContext(Dispatchers.Main) {
                    showUpdateDialog(activity, remote, isBelowMin)
                }
            } else if (!silent) {
                withContext(Dispatchers.Main) {
                    showNoUpdateDialog(activity)
                }
            }
        } catch (_: Exception) {
            if (!silent) {
                withContext(Dispatchers.Main) {
                    showNoUpdateDialog(activity)
                }
            }
        }
    }

    /**
     * Compares two semantic version strings (e.g. "1.2.3").
     * Returns positive if v1 > v2, negative if v1 < v2, 0 if equal.
     */
    private fun compareVersions(v1: String, v2: String): Int {
        val parts1 = v1.split(".").map { it.toIntOrNull() ?: 0 }
        val parts2 = v2.split(".").map { it.toIntOrNull() ?: 0 }
        val maxLen = maxOf(parts1.size, parts2.size)
        for (i in 0 until maxLen) {
            val p1 = parts1.getOrElse(i) { 0 }
            val p2 = parts2.getOrElse(i) { 0 }
            if (p1 != p2) return p1 - p2
        }
        return 0
    }

    private suspend fun fetchVersion(): VersionInfo? = withContext(Dispatchers.IO) {
        try {
            val json = URL(VERSION_URL).readText()
            val obj = JSONObject(json)
            VersionInfo(
                version = obj.getString("version"),
                changelog = obj.getString("changelog"),
                force = obj.optBoolean("force", false),
                apkUrl = obj.getString("apk_url"),
                minSupported = obj.optString("min_supported", "1.0.0")
            )
        } catch (_: Exception) {
            null
        }
    }

    private fun showUpdateDialog(activity: Activity, info: VersionInfo, forceUpdate: Boolean) {
        val dialog = Dialog(activity)
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE)
        dialog.setContentView(R.layout.dialog_update)
        dialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
        dialog.setCancelable(!info.force && !forceUpdate)

        val icon = dialog.findViewById<ImageView>(R.id.updateIcon)
        val title = dialog.findViewById<TextView>(R.id.updateTitle)
        val version = dialog.findViewById<TextView>(R.id.updateVersion)
        val changelog = dialog.findViewById<TextView>(R.id.updateChangelog)
        val btnUpdate = dialog.findViewById<Button>(R.id.btnUpdate)
        val btnLater = dialog.findViewById<Button>(R.id.btnLater)

        icon.setImageResource(R.mipmap.ic_launcher_foreground)
        title.text = activity.getString(R.string.update_available)
        version.text = "v${info.version}"
        changelog.text = info.changelog

        btnUpdate.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(info.apkUrl))
            activity.startActivity(intent)
            if (!info.force && !forceUpdate) dialog.dismiss()
        }

        if (info.force || forceUpdate) {
            btnLater.visibility = android.view.View.GONE
        } else {
            btnLater.setOnClickListener { dialog.dismiss() }
        }

        dialog.show()
    }

    private fun showNoUpdateDialog(activity: Activity) {
        val dialog = Dialog(activity)
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE)
        dialog.setContentView(R.layout.dialog_update)
        dialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
        dialog.setCancelable(true)

        val icon = dialog.findViewById<ImageView>(R.id.updateIcon)
        val title = dialog.findViewById<TextView>(R.id.updateTitle)
        val version = dialog.findViewById<TextView>(R.id.updateVersion)
        val changelog = dialog.findViewById<TextView>(R.id.updateChangelog)
        val btnUpdate = dialog.findViewById<Button>(R.id.btnUpdate)
        val btnLater = dialog.findViewById<Button>(R.id.btnLater)

        icon.setImageResource(R.mipmap.ic_launcher_foreground)
        title.text = activity.getString(R.string.no_update)
        version.text = ""
        changelog.text = activity.getString(R.string.no_update_message)

        btnUpdate.visibility = android.view.View.GONE
        btnLater.text = activity.getString(R.string.ok)
        btnLater.setOnClickListener { dialog.dismiss() }

        dialog.show()
    }
}

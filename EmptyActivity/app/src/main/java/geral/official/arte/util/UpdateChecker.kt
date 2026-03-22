package geral.official.arte.util

import android.app.Activity
import android.content.Intent
import android.net.Uri
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import geral.official.arte.R
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.net.URL

object UpdateChecker {

    private const val VERSION_URL = "https://officialarte.vercel.app/version.json"

    data class VersionInfo(
        val versionCode: Int,
        val versionName: String,
        val downloadUrl: String
    )

    suspend fun check(activity: Activity) {
        try {
            val remote = fetchVersion() ?: return
            val currentCode = activity.packageManager
                .getPackageInfo(activity.packageName, 0)
                .let {
                    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.P) {
                        it.longVersionCode.toInt()
                    } else {
                        @Suppress("DEPRECATION")
                        it.versionCode
                    }
                }

            if (remote.versionCode > currentCode) {
                withContext(Dispatchers.Main) {
                    showUpdateDialog(activity, remote)
                }
            }
        } catch (_: Exception) {
            // Silently ignore update check failures
        }
    }

    private suspend fun fetchVersion(): VersionInfo? = withContext(Dispatchers.IO) {
        try {
            val json = URL(VERSION_URL).readText()
            val obj = JSONObject(json)
            VersionInfo(
                versionCode = obj.getInt("versionCode"),
                versionName = obj.getString("versionName"),
                downloadUrl = obj.getString("downloadUrl")
            )
        } catch (_: Exception) {
            null
        }
    }

    private fun showUpdateDialog(activity: Activity, info: VersionInfo) {
        MaterialAlertDialogBuilder(activity)
            .setTitle(R.string.update_available)
            .setMessage(activity.getString(R.string.update_message))
            .setPositiveButton(R.string.update_now) { _, _ ->
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(info.downloadUrl))
                activity.startActivity(intent)
            }
            .setNegativeButton(R.string.later, null)
            .setCancelable(true)
            .show()
    }
}

# ============================================================
# ProGuard / R8 — OfficialArte
# Otimização, proteção e segurança contra engenharia reversa
# ============================================================

# ---------- General ----------
-optimizationpasses 5
-dontusemixedcaseclassnames
-dontskipnonpubliclibraryclasses
-verbose
-dontpreverify

# ---------- Obfuscation ----------
-repackageclasses ''
-allowaccessmodification
-overloadaggressively

# ---------- Remove logs in release ----------
-assumenosideeffects class android.util.Log {
    public static boolean isLoggable(java.lang.String, int);
    public static int v(...);
    public static int i(...);
    public static int w(...);
    public static int d(...);
    public static int e(...);
}

# ---------- WebView ----------
-keepattributes *Annotation*
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# ---------- Keep app entry points ----------
-keep class geral.official.arte.ui.** { *; }

# ---------- AndroidX / Material ----------
-keep class androidx.** { *; }
-keep class com.google.android.material.** { *; }
-dontwarn androidx.**
-dontwarn com.google.android.material.**

# ---------- Kotlin ----------
-keep class kotlin.** { *; }
-keep class kotlinx.** { *; }
-dontwarn kotlin.**
-dontwarn kotlinx.**

# ---------- Prevent signature check bypass ----------
-keep class java.security.MessageDigest { *; }
-keep class android.content.pm.PackageManager { *; }
-keep class android.content.pm.PackageInfo { *; }
-keep class android.content.pm.Signature { *; }
-keep class android.content.pm.SigningInfo { *; }

# ---------- Anti-tampering: keep signature verification ----------
-keepclassmembers class geral.official.arte.ui.SplashActivity {
    private boolean verifySignature();
    private final java.lang.String validSignature;
}

# ---------- Strip debug info ----------
-renamesourcefileattribute SourceFile
-keepattributes SourceFile,LineNumberTable

# ---------- Aggressive optimizations ----------
-optimizations !code/simplification/arithmetic,!code/simplification/cast,!field/*,!class/merging/*

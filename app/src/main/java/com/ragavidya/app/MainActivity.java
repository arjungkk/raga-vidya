package com.ragavidya.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.webkit.ConsoleMessage;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

    private static final int MIC_PERMISSION_CODE = 101;

    private WebView webView;
    // Held so we can grant it once the user approves the Android dialog
    private PermissionRequest pendingWebViewPermission;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        );
        applyImmersiveMode();

        setContentView(R.layout.activity_main);
        webView = findViewById(R.id.webview);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);

        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return false;
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {

            @Override
            public boolean onConsoleMessage(ConsoleMessage message) {
                android.util.Log.d("RagaVidya",
                    message.message() + " [" + message.sourceId() + ":" + message.lineNumber() + "]");
                return true;
            }

            /**
             * Called when the web page requests a privileged resource (microphone).
             * We check / request the Android-level RECORD_AUDIO permission first,
             * then grant the WebView permission once Android approves it.
             */
            @Override
            public void onPermissionRequest(PermissionRequest request) {
                boolean needsMic = false;
                for (String res : request.getResources()) {
                    if (PermissionRequest.RESOURCE_AUDIO_CAPTURE.equals(res)) {
                        needsMic = true;
                        break;
                    }
                }

                if (needsMic) {
                    if (checkSelfPermission(android.Manifest.permission.RECORD_AUDIO)
                            == PackageManager.PERMISSION_GRANTED) {
                        // Already have Android permission — grant WebView immediately
                        request.grant(request.getResources());
                    } else {
                        // Stash the request and ask Android
                        pendingWebViewPermission = request;
                        requestPermissions(
                            new String[]{ android.Manifest.permission.RECORD_AUDIO },
                            MIC_PERMISSION_CODE
                        );
                    }
                } else {
                    request.grant(request.getResources());
                }
            }

            @Override
            public void onPermissionRequestCanceled(PermissionRequest request) {
                request.deny();
            }
        });

        webView.loadUrl("file:///android_asset/index.html");
    }

    /**
     * Called after the user responds to the Android mic permission dialog.
     * Forward the result to the pending WebView permission request.
     */
    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String[] permissions,
                                           int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == MIC_PERMISSION_CODE && pendingWebViewPermission != null) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                pendingWebViewPermission.grant(pendingWebViewPermission.getResources());
            } else {
                pendingWebViewPermission.deny();
            }
            pendingWebViewPermission = null;
        }
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }

    @Override
    protected void onResume() {
        super.onResume();
        webView.onResume();
        applyImmersiveMode();
    }

    @Override
    protected void onPause() {
        super.onPause();
        webView.onPause();
    }

    @Override
    protected void onDestroy() {
        webView.destroy();
        super.onDestroy();
    }

    private void applyImmersiveMode() {
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_FULLSCREEN
        );
    }
}

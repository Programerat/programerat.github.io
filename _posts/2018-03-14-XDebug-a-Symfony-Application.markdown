---
title:  "XDebug a Symfony Application with PHPStorm"
date:   2018-03-14 13:15:00
description: Here are the steps to setup the xdebug and Debug a controller with PHPStorm.
tags: Synfony, xdebug, php, debug, controller
---

<h1 id="xdebug-a-symfony-application-with-phpstorm">XDebug a Symfony Application with PHPStorm</h1>
<blockquote>
<p>Here are the steps to setup the xdebug and Debug a controller with PHPStorm</p>
</blockquote>
<h6 id="info-in-this-project-i-am-using-mamp-php-7-phpstorm-xdebug_2.5.0">Info: In this project I am using MAMP, PHP 7, PHPStorm, Xdebug_2.5.0</h6>
<p>This is for all the PHP developers who are tired of <code>var_dump()</code>, <code>print_r()</code>, <code>dump()</code>.</p>
<h2 id="setup-the-xdebug">Setup the XDebug</h2>
<blockquote>
<p>Note: If you have xdebugger already installed skip to the <strong>Let’s debug a Controller</strong></p>
</blockquote>
<p>Go to this URL and follow the steps to get appropriate xdebug for your system.<br>
<a href="https://xdebug.org/wizard.php">https://xdebug.org/wizard.php</a></p>
<blockquote>
<p>Note: For bash, users execute this command to get the <code>phpinfo()</code> for the wizard <code>php -i &gt; ~/Desktop/phpinfo.txt</code> than copy the content and paste it to the wizard website and follow the steps.</p>
</blockquote>
<p>This is my <code>php.ini</code> configuration for <strong>xdebug</strong> to find your <code>php.ini</code> type the following command <code>php -i | grep "php.ini"</code> and you will se the path to the <code>php.ini</code> file.</p>
<pre><code>[xdebug]
zend_extension="~path-to-your-php-libraries/xdebug.so" #Get this from wizard.php
xdebug.remote_enable = 1
xdebug.remote_autostart = 1
xdebug.remote_port="9000"
xdebug.profiler_enable=1
</code></pre>
<p>For the configurations to take place just execute <code># apache2ctl restart</code> or restart Xampp or whichever engine you are using.<br>
<a href="https://www.cyberciti.biz/faq/unix-linux-restart-php-service-command/">Click here if the command is not working for you</a></p>
<p>Next go to PHPStorm preferences, then navigate under Languages &amp; Frameworks &gt; PHP<br>
You should see this window</p>
<p><img src="https://lh3.googleusercontent.com/qOalHkQIcJ2qmocpV-TZgafK4LXouAMMQPx7HeyCLzTV8b55MYDBMVfeYKr8KM3Bs3INHZFgsqT-9A" alt=""><br>
After you click the <strong>…</strong> button in the preferences window you should see another window <strong>CLI Interpreters</strong> and inside this windows, under PHP Executable you should see Debugger: Xdebug… if it’s correctly enabled.</p>
<h2 id="lets-debug-a-controller">Let’s debug a Controller</h2>
<h6 id="this-should-work-for-also-for-laravel-framework.">This should work for also for Laravel Framework.</h6>
<p>First, we have to configure the type of project we are trying to debug.<br>
Navigate to <strong>Run&gt;Edit Configurations</strong> and you will see this window.<br>
<img src="https://lh3.googleusercontent.com/fnE72wX4HaXrnutVVYfPyC6Un2z4jIbF65gyv0xEfRso894PJlwlUidkOrwOdRQhhBH_f6ois7Hyiw=s700" alt="enter image description here" title="Edit Configurations"><br>
After you click on the <strong>+</strong> icon you have to select <strong>PHP Web Page</strong> or <strong>PHP Web Application</strong> depends on your PHPStorm version.<br>
You have to click <strong>…</strong> to the right of the Server: and configure the server as you want.<br>
You have to choose the Absolute path on the server as I did in the picture below, you can do this by clicking the checkbox <strong>Use path mappings</strong><br>
<img src="https://lh3.googleusercontent.com/CgBNySV9ub_qx0kVgfsxQCAHVcG36-uipum9t0Zw0_Dj1xMa-m4veaZ2n-MwHTJF1lJOBEmZXFO0CA=s700" alt="enter image description here"><br>
Next, you have to choose the server you created in the configurations, fill the Start URL:, and then choose the browser then you have to click on the validate link marked in the red color in the image.<br>
<img src="https://lh3.googleusercontent.com/JC0aqBTPzuX2P3D_ptiQ_852_NwR_LTNn3s8YKDIGYMwdB-JPowmVf_wFU-B1Q8jwGQTncfYK8k-Yg=s700" alt="enter image description here"><br>
After clicking on the Validate link you should add to the path <code>project_url/web</code> and just start your Symfony application <code>bin/console server:run</code> then just click Validate and you should see everything green like in the picture below.<br>
<img src="https://lh3.googleusercontent.com/7EYpuONA2uTCZhB9HzsA0oE2a86cs0xAkN8CNE5WIwsg8eJJFRDurW6Kt9UJCMxSeXYmPVdD8b-Mqg=s700" alt="enter image description here"><br>
Ok, close this window and save the configurations.</p>
<p>Next thing to do is start listening for debug connection by clicking the <strong>Run &gt; Listen for PHP Debug Connections</strong><br>
Now you are ready to add some Breakpoints and debug your controllers.<br>
<img src="https://lh3.googleusercontent.com/dWtofpnBoy0Sv_--o3TQl1u3ETLWPc8ZyX7zDR2yITagi-yKEplWk6y_Owl--nNTAhdn1iUxWqor9w=s700" alt="enter image description here"></p>
<p>Have fun.</p>


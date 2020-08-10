+++
title = "Build Angular Application"
weight = 15
pre = "<b>2.2 </b>"
+++

1. Navigate to the root of the cloned directory and run the following command:
    ```bash
    $ ng build --prod
    ```
   This will install all the necessary packages for this project and build the project

3. To verify that app was built, you can find the resulting build by navigating to the `/dist/workshop-angular` directory from the root of your project directory.

4. Before moving on, it is important to verify that your app was built and that the structure of the resulting build looks like this:
    ```bash
    $ cd dist/workshop-angular
    $ ls
    3rdpartylicenses.txt
    favicon.ico
    fontawesome-webfont.1e59d2330b4c6deb84b3.ttf
    fontawesome-webfont.20fd1704ea223900efa9.woff2
    fontawesome-webfont.8b43027f47b20503057d.eot
    fontawesome-webfont.c1e38fd9e0e74ba58f7a.svg
    fontawesome-webfont.f691f37e57f04c152e23.woff
    index.html
    main-es2015.313bb4a7e979c8fb3511.js
    main-es5.313bb4a7e979c8fb3511.js
    polyfills-es2015.1ea1a560738e38b47abf.js
    polyfills-es5.a702916e9ff6283ec286.js
    runtime-es2015.0dae8cbc97194c7caed4.js
    runtime-es5.0dae8cbc97194c7caed4.js
    styles.18e14798f340167cfa6f.css
    ```
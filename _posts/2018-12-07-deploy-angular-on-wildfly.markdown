---
layout: post
title:  "Deploy Angular Application on Wildfly Server"
date:   2018-12-07 20:00:00
tags: angular, wildfly, deploy
---

Let's deploy an angular application on a wildfly server. Let's get started.

## 1. We need an angular application so let's run

```bash

$ npm install --global @angular/cli

# if installation finished

$ ng new my-awesome-application

```

## 2. Lets create a maven pom.xml in root folder of the project

```xml

<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.example</groupId>
  <artifactId>my-awesome-application</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>war</packaging>

  <build>
    <plugins>
      <plugin>
        <artifactId>maven-resources-plugin</artifactId>
      </plugin>
    </plugins>
  </build>

</project>

```

## 3. Let's create some folders and files for the wildfly server

```base

# call from project root folder
$ mkdir -p src/main/webapp/WEB-INF

# a jboss web xml required if you want to specify the context-root of the application
$ touch src/main/webapp/WEB-INF/jboss-web.xml 

# just to setup the welcome file
$ touch src/main/webapp/WEB-INF/web.xml

# html5 mode magic
$ touch src/main/webapp/WEB-INF/undertow-handlers.conf
```

## 4. set context-root in jboss-web.xml

> (optional step - context-root will be set to **${project.artifactId}-${project.version}** if not specified)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<jboss-web xmlns="http://www.jboss.com/xml/ns/javaee"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="
      http://www.jboss.com/xml/ns/javaee
      http://www.jboss.org/j2ee/schema/jboss-web_5_1.xsd">
  
  <context-root>my-awesome-application</context-root>

</jboss-web>
```

## 5. setup web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">

  <welcome-file-list>
    <welcome-file>/resources/index.html</welcome-file>
  </welcome-file-list>

</web-app>
```

> remember the defined location **/resources** (it means -> **src/main/webapp/resources**)

## 6. setup undertow-handlers.conf

```
path-prefix('/api') -> done
path-suffix('.js') -> done
path-prefix('/') -> rewrite('/')
```

1. first prefix is only required if you want use a custom backend in your application (not angular) e.g. jax-rs
2. if you have other files (css, fonts, etc) you have to add more rules like the second e.g. **path-suffix('.etc') -> done**
3. the third line is our catch all handler to route all other matching routes to our welcome file (it makes HTML5 Mode possible)

## 7. update angular.json

u have to add 2 more properties and update 1 property under:
``` projects > my-awesome-application > architect > build > options ```

* **update** - outputPath - should point to ``` src/main/webapp/resources ``` **HINT: THIS FOLDER WILL BE CLEARED FOR EVERY ANGULAR BUILD**
* **add** - baseHref - this must be the context root of your application, e.g.:
  * if jboss-web.xml is like step 4 ``` "baseHref": "/my-aweosome-application/" ```
  * if no context root is specified ``` "baseHref": "/${project.artifactId}-${project.version}/" ``` e.g. ``` "baseHref": "/${my-awesome-application}-${1.0-SNAPSHOT}/" ```
* **add** - deployUrl - this must be the relative path from context-root to the resources folder - its required for source linking - our ``` outputPath ``` ends up in the
resources folder - deployUrl have to be ``` "deployUrl": "resources/" ``` **HINT: Path separator suffix is required...**

**here an example**

```json
{
  // ...
  "projects": {
    "my-awesome-application": {
      // ...
      "architect": {
        "build": {
          // ...
          "options": {
            "outputPath": "dist",
            "baseHref": "/my-awesome-application/",
            "deployUrl": "resources/",
            // ...
          }, // ...
        }, // ...
      }, // ...
    }, // ...
  }, // ...
}, // ...
```
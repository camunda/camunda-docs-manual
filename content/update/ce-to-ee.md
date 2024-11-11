---
 
title: "Migrating from Community to Enterprise Edition"
weight: 20
 
menu:
 main:
   name: "Migrating from Community to Enterprise Edition"
   identifier: "migration-guide-community-enterprise"
   parent: "migration-guide"
   pre: "Guides you through updating from Community to Enterprise Edition."
 
---

If you’re hoping to utilize [features of Enterprise Edition](https://camunda.com/platform-7/editions/) (such as see how many process instances have been run, token history, heatmaps, and migrate model versions) you may be interested in migrating from Camunda 7 Community Edition to the Enterprise Edition.

In this guide, we’ll step through migration from Camunda 7 Community Edition to Enterprise Edition.

# Prerequisites

- IDE or code editor of your choice (in this example, we’ll use Visual Studio Code.)
- Access to [Camunda Modeler](https://camunda.com/download/modeler/).
- Access to [GitHub](https://github.com/camunda-community-hub/Camunda-7-Spring-Boot-Tutorial-Lafayette) for our tutorial example.
- Java 17
- Maven

{{< note class="info" >}}
If needed, you can obtain a license key and [start a 30-day trial](https://camunda.com/download/enterprise/) of Camunda 7 Enterprise Edition.
{{< /note >}}

# Set up

To get started, take the following steps:

1. Clone our [example repository](https://github.com/camunda-community-hub/Camunda-7-Spring-Boot-Tutorial-Lafayette), where we’ll take part in assisting some mock revolutions.
2. Open the repo in your preferred IDE.
3. Within `src > main > java`, click `Application.java` and run the application in your terminal to ensure it functions properly with your environment.
4. After the application successfully runs, open your browser and visit [http://localhost:8080/](http://localhost:8080/). You can log in with the username and password `demo`.
Click **Cockpit**, where you’ll notice the four appropriate process instances are running from our application.

{{< img src="../img/camunda-cockpit-example.png" title="Camunda Cockpit" >}}

## Migration

To officially begin migrating from Camunda 7 Community Edition to the Enterprise Edition, take the following steps:

1. Return to the example repository you cloned in your preferred IDE.
2. Run the `Application.java` application.
3. Navigate to your `pom.xml` file.
4. Add `-ee` to the version. For example, `<version>7.16.0-ee</version>`. You’ll need to make these changes below the following `artifactIds`: `camunda-bom`, `camunda-bpm-spring-boot-starter-rest`, `camunda-bpm-spring-boot-starter-webapp` (you’ll also adjust this particular artifactID itself to `camunda-bpm-spring-boot-starter-webapp-ee`.)
    ```xml
    <dependency>
      <groupId>org.camunda.bpm</groupId>
      <artifactId>camunda-bom</artifactId>
      <version>7.15.0-ee</version>
      <scope>import</scope>
      <type>pom</type>
    </dependency>
    </dependencies>
    </dependencyManagement>
    
    <dependencies>
      <dependency>
        <groupId>org.camunda.bpm.springboot</groupId>
        <artifactId>camunda-bpm-spring-boot-starter-rest</artifactId>
        <version>7.15.0-ee</version>
      </dependency>
    
    <dependency>
      <groupId>org.camunda.bpm.springboot</groupId>
      <artifactId>camunda-bpm-spring-boot-starter-webapp-ee</artifactId>
      <version>7.15.0-ee</version>
    </dependency>
    ```
5. We need to tell it where to find these new dependencies. Therefore, we’ll add the locations of the repositories at the end of the dependencies in the `pom.xml` file as follows:
    ```xml
    <repositories>
      <repository>
        <id>camunda-bpm-nexus</id>
        <name>camunda-bpm-nexus</name>
        <url>
        https://artifacts.camunda.com/artifactory/public/
        </url>
      </repository>
      <repository>
        <id>Camunda-bpm-nexus-ee</id>
        <name>camunda-bpm-nexus</name>
        <url>
        https://artifacts.camunda.com/artifactory/private/
        </url>
      </repository>
    </repositories>
    ```
6. Add the username and password you received when you were granted a license to your Maven settings. To do this, go the Maven `config` file, usually located at `${user.home}/.m2/settings.xml`. Then, add your information similar to the following:
    ```xml
    <servers>
      <server>
        <id>camunda-bpm-nexus-ee</id>
        <username>trial_your_name_here</username>
        <password>YoUrPaSsWoRd</password>
      </server>
    </servers>
    ```

You can find more details on this step [here](https://maven.apache.org/settings.html).
1. In your terminal, run `mvn clean install` to remove the old content and add the new content.
2. Go back to `Application.java` and run Java once more to see the changes complete.

# Add your license key

Now that you’ve made the physical adjustments in your IDE to update to Enterprise Edition, let’s make a few final changes in Camunda 7.

1. Return to [http://localhost:8080/](http://localhost:8080/) and refresh the page.
2. If you don't see the version `{{< minor-version >}}-ee` in the bottom corner, clear your browser cache.
3. Enter your credentials once more to update. You’ll notice you’re updated successfully when you reopen **Cockpit** and see a request message in the middle of the page for a license key.
4. Click **Enter your license key now**.
5. Paste your license key into the prompted text field, or if you haven’t already, obtain a license key and [start a 30-day trial](https://camunda.com/download/enterprise/) of Camunda 7 Enterprise Edition.
6. Click **Save Key**.

# Next steps

After you’ve made the required changes above, return to Camunda Cockpit. You’ll notice the migration has completed as you can now view the section titled **Metrics**.

You’ll notice your process instances are still the same, but you don’t have any running instances yet. You can learn more about [stepping through a process](https://youtu.be/8RXUdbGQaEo?t=757) and the [features of Enterprise Edition](https://youtu.be/8RXUdbGQaEo?t=918) (see how many process instances have been run, token history, heatmaps, and migrate model versions) by watching our video on [migration from Community Edition to Enterprise Edition](https://www.youtube.com/watch?v=8RXUdbGQaEo&list=PPSV).

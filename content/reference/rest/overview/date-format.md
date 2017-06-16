---

title: "Custom Date Format"
weight: 60

menu:
  main:
    identifier: "rest-api-overview-custom-date-format"
    parent: "rest-api-overview"

---

The REST API uses the default date format `yyyy-MM-dd'T'HH:mm:ss.SSSZ` which
represents a date with milliseconds and timezone information, eg
`2016-01-25T13:33:42.165+0100`. A custom date format can be configured in the `web.xml`
file of the REST API. Therefore the ServletContextListener
`CustomJacksonDateFormatListener` has to be added. The custom date format
can be specified by the context parameter
`org.camunda.bpm.engine.rest.jackson.dateFormat`.

For example, if the date format should not contain milliseconds and timezone
information (`yyyy-MM-dd'T'HH:mm:ss`) the following configuration can be
used.

To achieve this, you can edit the `WEB-INF/web.xml` file as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.5" xmlns="http://java.sun.com/xml/ns/javaee"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">

  <!-- ... -->

  <listener>
    <listener-class>
      org.camunda.bpm.engine.rest.CustomJacksonDateFormatListener
    </listener-class>
  </listener>

  <context-param>
    <param-name>org.camunda.bpm.engine.rest.jackson.dateFormat</param-name>
    <param-value>yyyy-MM-dd'T'HH:mm:ss</param-value>
  </context-param>

  <!-- ... -->
</web-app>
```

With this configuration the REST API will return dates with millisecond
precision and timezone information. Also, new dates, with milliseconds and timezone information, 
can be submitted to the REST API without losing these details.

{{< note title="Webapps compatibility" class="warning" >}}
Be aware that to be able to use Camunda webapps the datetime format must correspond to the following:

`yyyy-MM-dd['T'HH:mm[:ss[.SSS[Z]]]]`

{{< /note >}}

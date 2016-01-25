---

title: "Custom Date Format"
weight: 60

menu:
  main:
    identifier: "rest-api-overview-custom-date-format"
    parent: "rest-api-overview"

---

The REST API uses the default date format `yyyy-MM-dd'T'HH:mm:ss` which
represents a date without milliseconds and timezone information, eg
`2016-01-25T13:33:42`. A custom date format can be configured in the `web.xml`
file of the REST API. Therefore the ServletContextListener
`CustomJacksonDateFormatListener` has to be added. And the custom date format
can be specified by the context parameter
`org.camunda.bpm.engine.rest.jackson.dateFormat`.

For example if the date format should contain milliseconds and timezone
information (`yyyy-MM-dd'T'HH:mm:ss.SSSZ`) the following configuration can be
used:

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
    <param-value>yyyy-MM-dd'T'HH:mm:ss.SSSZ</param-value>
  </context-param>

  <!-- ... -->
</web-app>
```

With this configuration the REST API will return dates with millisecond
precision and timezone information. Also new dates can be submitted with
milliseconds and timezone information to the REST API without losing these
details.

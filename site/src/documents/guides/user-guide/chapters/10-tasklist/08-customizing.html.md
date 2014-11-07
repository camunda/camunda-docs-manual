---

title: 'Customizing'
category: 'Tasklist'

---

You can override the default configuration of the tasklist using a central configuration file
located in `app/tasklist/scripts/config.js`. Currently, the following configuration options are
available:

##Date Format

Dates can be configured by specifying a `dateFormat` object. The values of the properties of this
object must be strings representing date formats in accordance to
[moment.js](http://momentjs.com). Following date formats are used within the tasklist:

- `monthName` represents the name of a month (e.g. January).
- `day` represents the number of a day in a month (1..31).
- `abbr` represents a short format of a date including time.
- `normal` represents the standard format of a date including time.
- `long` represents a verbose format of a date including time and day of the week.
- `short` represents a short format of a date excluding time.


##Example Configuration

```javascript
var camTasklistConf = {
  "dateFormat": {
    "monthName": "MMM",
    "long":   "LLLL"
  }
};
```

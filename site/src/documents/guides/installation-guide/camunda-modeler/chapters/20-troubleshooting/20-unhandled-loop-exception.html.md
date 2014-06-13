---

title: 'Unhandled loop exception'
category: 'Troubleshooting'

---


If the Modeler behaves strangely and you are getting exceptions like [this](http://stackoverflow.com/questions/84147/org-eclipse-swt-swterror-item-not-added), please try the following:

* Clean up your Eclipse.
* Start your Eclipse with command line option `-clean` once.
* Depending on your models, you might want to give Eclipse more resources. You may do so by appending the following lines in the eclipse.ini file residing next to your Eclipse executable.
```
-Xms768m
-Xmx1024m
```

If these options already exist, remove them first.



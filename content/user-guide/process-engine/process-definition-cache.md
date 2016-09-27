---

title: 'Process Definition Cache'
weight: 150

menu:
  main:
    identifier: "user-guide-process-engine-pd-cache"
    parent: "user-guide-process-engine"

---
---

All process definitions are cached (after they have been parsed) to avoid polling the database every time a process definition is needed and because process definition data doesn't change. This reduces the latency of referencing the process definitions and thus improves the performance of the system.

# Customize the maximum Capacity of the Cache

If one has many process definitions, the cache might occupy a large amount of memory and the capacity of the working memory may reach its limits. Therefore, after the maximum capacity is reached the least recently used process definition entry is evicted from the cache to satisfy the capacity condition. However, if one still meets out of memory issues, it can be necessary to lower the maximum capacity of the cache. 

By changing the maximum capacity, the configuration effects all of the following cache components:

 * Process definition
 * Case definition
 * Decision definition
 * Decision requirements definition
   
In the Spring process engine configuration one can specify the maximum of elements in the cache. The default value is *1000*. When the process engine is created, all those resources will be scanned and deployed. As an example the maximum capacity could be set to *120* as follows:

```xml
<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.impl.cfg.StandaloneInMemProcessEngineConfiguration">
	<!-- Your property definitions! -->
					....
					
	<property name="maxNumberOfElementsInCache" value="120" />  
</bean>
```

__Note:__ The same capacity is used for all of the components stated above and it is not possible to set the capacity size individually for each component. Furthermore, corresponds the capacity size to the maximum number of elements in the cache that are used. That means, the absolute amount of physical storage (e.g. mega bytes) you use up depends on the size needed for the respective process definitions.


# Provide a custom Cache Implementation

The default implementation of the cache evicts the least recently used entry as soon as the maximum capacity is exceeded. If it is necessary to choose the evicted cache entries by a different criteria, one can provide its own cache implementation.

One can do this by implementing the Cache interface from *org.camunda.util.commons package*. Let's assume for example that the following class has been implemented:

```java
public class MyCacheImplementation<K, V> implements Cache<K, V> {
	
	// implement interface methods and your own cache logic here
}
```

Next, one need to plug in *MyCacheImplementation* into a custom *CacheFactory*:

```java
public class MyCacheFactory implements CacheFactory{

  @Override
  public Cache createCache(int maxNumberOfElementsInCache) {
    return new MyCacheImplementation<String, DbEntity>(maxNumberOfElementsInCache);
  }
}
```
    
The factory is used to provide the cache implementation for different cache components such as the process definition or the case definition. Once this is done, one can use the Spring process engine configuration where one can specify a set of resources. When the process engine is created, all those resources will be scanned and deployed. In the given example the custom cache factory could now be deployed as follows:

```xml
<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.impl.cfg.StandaloneInMemProcessEngineConfiguration">
	<!-- Your property definitions! -->
					....

	<property name="cacheFactory">
			<bean class="org.camunda.bpm.engine.test.api.cfg.MyCacheFactory" />
	</property>
</bean>
```





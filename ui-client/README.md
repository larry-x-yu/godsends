# Use scoped css
As this application was created using react-create-app, to avoid ejecting everything, we used 
a [craco](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation) 
package to override webpack default configuations. This plugin is needed as we used [scoped css](https://github.com/gaoxiaoliangz/react-scoped-css) instead of the default modulized css in our application. This is way that I personally like and less far away from a normal structure of a web application.

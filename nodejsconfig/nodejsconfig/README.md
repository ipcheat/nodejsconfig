# nodejsconfig

<h1>如何使用</h1>
在项目根目录下创建文件“<strong>global.json</strong>”，这是一个标准的json文件，请确保格式正确<br/>
此组件会自动检查配置文件是否更新，如果未更新，不会反复读配置文件，会自动缓存配置文件<br/>
调用方法:<br/>
<pre>
var config = require('./configcore.js');
config.getItem('xyz');
</pre>



importScripts('./ngsw-worker.js');

console.log('Custom service worker loaded')
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    "https://developer.api.autodesk.com/modelderivative/v2/viewers/viewer3D.min.js?v=v7.25",
    "https://developer.api.autodesk.com/modelderivative/v2/viewers/style.min.css?v=v7.25",
    "https://developer.api.autodesk.com/modelderivative/v2/viewers/7.25.1/lmvworker.min.js",
    "https://fonts.autodesk.com/ArtifaktElement/WOFF2/Artifakt%20Element%20Regular.woff2",
    "https://developer.api.autodesk.com/modelderivative/v2/viewers/7.25.1/extensions/LayerManager/LayerManager.min.js",
    "https://developer.api.autodesk.com/modelderivative/v2/viewers/7.25.1/extensions/Section/Section.min.js",
    "https://developer.api.autodesk.com/modelderivative/v2/viewers/7.25.1/extensions/Measure/Measure.min.js",
    "https://developer.api.autodesk.com/modelderivative/v2/viewers/7.25.1/extensions/BimWalk/BimWalk.min.js",
    "https://developer.api.autodesk.com/modelderivative/v2/viewers/7.25.1/res/locales/en/allstrings.json",
    "https://developer.api.autodesk.com/modelderivative/v2/viewers/7.25.1/extensions/ViewCubeUi/ViewCubeUi.min.js",
    "https://fonts.autodesk.com/ArtifaktElement/WOFF2/Artifakt%20Element%20Light.woff2",
    "https://developer.api.autodesk.com/modelderivative/v2/viewers/7.25.1/res/environments/SharpHighlights_irr.logluv.dds",
    "https://developer.api.autodesk.com/modelderivative/v2/viewers/7.25.1/res/environments/SharpHighlights_mipdrop.logluv.dds",
    "http://localhost:4300/assets/models/1/0.pf","http://localhost:4300/assets/models/1/0.svf","http://localhost:4300/assets/models/1/0.svf.png","http://localhost:4300/assets/models/1/1.pf","http://localhost:4300/assets/models/1/10.pf","http://localhost:4300/assets/models/1/100.pf","http://localhost:4300/assets/models/1/101.pf","http://localhost:4300/assets/models/1/102.pf","http://localhost:4300/assets/models/1/103.pf","http://localhost:4300/assets/models/1/104.pf","http://localhost:4300/assets/models/1/105.pf","http://localhost:4300/assets/models/1/106.pf","http://localhost:4300/assets/models/1/11.pf","http://localhost:4300/assets/models/1/12.pf","http://localhost:4300/assets/models/1/13.pf","http://localhost:4300/assets/models/1/14.pf","http://localhost:4300/assets/models/1/15.pf","http://localhost:4300/assets/models/1/16.pf","http://localhost:4300/assets/models/1/17.pf","http://localhost:4300/assets/models/1/18.pf","http://localhost:4300/assets/models/1/19.pf","http://localhost:4300/assets/models/1/2.pf","http://localhost:4300/assets/models/1/20.pf","http://localhost:4300/assets/models/1/21.pf","http://localhost:4300/assets/models/1/22.pf","http://localhost:4300/assets/models/1/23.pf","http://localhost:4300/assets/models/1/24.pf","http://localhost:4300/assets/models/1/25.pf","http://localhost:4300/assets/models/1/26.pf","http://localhost:4300/assets/models/1/27.pf","http://localhost:4300/assets/models/1/28.pf","http://localhost:4300/assets/models/1/29.pf","http://localhost:4300/assets/models/1/3.pf","http://localhost:4300/assets/models/1/30.pf","http://localhost:4300/assets/models/1/31.pf","http://localhost:4300/assets/models/1/32.pf","http://localhost:4300/assets/models/1/33.pf","http://localhost:4300/assets/models/1/34.pf","http://localhost:4300/assets/models/1/35.pf","http://localhost:4300/assets/models/1/36.pf","http://localhost:4300/assets/models/1/37.pf","http://localhost:4300/assets/models/1/38.pf","http://localhost:4300/assets/models/1/39.pf","http://localhost:4300/assets/models/1/4.pf","http://localhost:4300/assets/models/1/40.pf","http://localhost:4300/assets/models/1/41.pf","http://localhost:4300/assets/models/1/42.pf","http://localhost:4300/assets/models/1/43.pf","http://localhost:4300/assets/models/1/44.pf","http://localhost:4300/assets/models/1/45.pf","http://localhost:4300/assets/models/1/46.pf","http://localhost:4300/assets/models/1/47.pf","http://localhost:4300/assets/models/1/48.pf","http://localhost:4300/assets/models/1/49.pf","http://localhost:4300/assets/models/1/5.pf","http://localhost:4300/assets/models/1/50.pf","http://localhost:4300/assets/models/1/51.pf","http://localhost:4300/assets/models/1/52.pf","http://localhost:4300/assets/models/1/53.pf","http://localhost:4300/assets/models/1/54.pf","http://localhost:4300/assets/models/1/55.pf","http://localhost:4300/assets/models/1/56.pf","http://localhost:4300/assets/models/1/57.pf","http://localhost:4300/assets/models/1/58.pf","http://localhost:4300/assets/models/1/59.pf","http://localhost:4300/assets/models/1/6.pf","http://localhost:4300/assets/models/1/60.pf","http://localhost:4300/assets/models/1/61.pf","http://localhost:4300/assets/models/1/62.pf","http://localhost:4300/assets/models/1/63.pf","http://localhost:4300/assets/models/1/64.pf","http://localhost:4300/assets/models/1/65.pf","http://localhost:4300/assets/models/1/66.pf","http://localhost:4300/assets/models/1/67.pf","http://localhost:4300/assets/models/1/68.pf","http://localhost:4300/assets/models/1/69.pf","http://localhost:4300/assets/models/1/7.pf","http://localhost:4300/assets/models/1/70.pf","http://localhost:4300/assets/models/1/71.pf","http://localhost:4300/assets/models/1/72.pf","http://localhost:4300/assets/models/1/73.pf","http://localhost:4300/assets/models/1/74.pf","http://localhost:4300/assets/models/1/75.pf","http://localhost:4300/assets/models/1/76.pf","http://localhost:4300/assets/models/1/77.pf","http://localhost:4300/assets/models/1/78.pf","http://localhost:4300/assets/models/1/79.pf","http://localhost:4300/assets/models/1/8.pf","http://localhost:4300/assets/models/1/80.pf","http://localhost:4300/assets/models/1/81.pf","http://localhost:4300/assets/models/1/82.pf","http://localhost:4300/assets/models/1/83.pf","http://localhost:4300/assets/models/1/84.pf","http://localhost:4300/assets/models/1/85.pf","http://localhost:4300/assets/models/1/86.pf","http://localhost:4300/assets/models/1/87.pf","http://localhost:4300/assets/models/1/88.pf","http://localhost:4300/assets/models/1/89.pf","http://localhost:4300/assets/models/1/9.pf","http://localhost:4300/assets/models/1/90.pf","http://localhost:4300/assets/models/1/91.pf","http://localhost:4300/assets/models/1/92.pf","http://localhost:4300/assets/models/1/93.pf","http://localhost:4300/assets/models/1/94.pf","http://localhost:4300/assets/models/1/95.pf","http://localhost:4300/assets/models/1/96.pf","http://localhost:4300/assets/models/1/97.pf","http://localhost:4300/assets/models/1/98.pf","http://localhost:4300/assets/models/1/99.pf","http://localhost:4300/assets/models/1/CameraDefinitions.bin","http://localhost:4300/assets/models/1/CameraList.bin","http://localhost:4300/assets/models/1/FragmentList.pack","http://localhost:4300/assets/models/1/GeometryMetadata.pf","http://localhost:4300/assets/models/1/InstanceTree.bin","http://localhost:4300/assets/models/1/LightDefinitions.bin","http://localhost:4300/assets/models/1/LightList.bin","http://localhost:4300/assets/models/1/Materials.json.gz","http://localhost:4300/assets/models/1/objects_attrs.json.gz","http://localhost:4300/assets/models/1/objects_avs.json.gz","http://localhost:4300/assets/models/1/objects_ids.json.gz","http://localhost:4300/assets/models/1/objects_offs.json.gz","http://localhost:4300/assets/models/1/objects_rcvs.json.gz","http://localhost:4300/assets/models/1/objects_rcv_offs.json.gz","http://localhost:4300/assets/models/1/objects_vals.json.gz","http://localhost:4300/assets/models/1/objects_viewables.json.gz","http://localhost:4300/assets/models/1/Set.bin"];

let ClientInstance;

addEventListener('message', event => {
    console.log('here', event.data)
    if (event.data && event.data.action && event.data.action === 'INITIALIZE') {return;}
    if (event.data && event.data.action && event.data.action === 'PUSH') {

        sendNotification(event.data);
        return;;
    }

    console.log(1)
    ClientInstance = event.source;

    console.log(`The client sent me a message:`, event.data);// event is an ExtendableMessageEvent object

    // console.log(event.source)
    ClientInstance.postMessage("Hi client");

    // console.log('-0---', ClientInstance)

});

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .then(function (cache)
            {
                console.log('Files cached')
                console.log(2)
                setTimeout(() => ClientInstance.postMessage({action: 'install.complete'}), 2000)
                // ClientInstance.postMessage("All Files Cached");
            })
    );
});

async function install() {

}

function sendNotification(data) {
    console.log('Hereeeee', navigator.serviceWorker)
    navigator.serviceWorker.getRegistration().then(function(reg) {
        console.log('Registration is :',reg);
        if (!reg) {return;}
        reg.showNotification(data);
    });
}

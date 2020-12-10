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
    "https://laughing-bartik-c2d22e.netlify.app/assets/models/1/0.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/0.svf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/0.svf.png","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/1.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/10.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/100.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/101.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/102.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/103.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/104.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/105.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/106.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/11.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/12.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/13.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/14.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/15.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/16.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/17.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/18.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/19.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/2.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/20.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/21.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/22.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/23.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/24.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/25.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/26.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/27.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/28.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/29.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/3.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/30.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/31.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/32.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/33.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/34.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/35.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/36.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/37.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/38.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/39.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/4.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/40.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/41.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/42.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/43.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/44.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/45.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/46.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/47.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/48.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/49.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/5.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/50.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/51.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/52.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/53.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/54.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/55.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/56.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/57.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/58.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/59.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/6.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/60.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/61.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/62.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/63.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/64.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/65.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/66.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/67.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/68.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/69.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/7.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/70.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/71.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/72.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/73.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/74.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/75.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/76.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/77.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/78.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/79.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/8.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/80.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/81.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/82.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/83.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/84.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/85.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/86.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/87.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/88.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/89.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/9.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/90.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/91.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/92.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/93.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/94.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/95.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/96.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/97.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/98.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/99.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/CameraDefinitions.bin","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/CameraList.bin","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/FragmentList.pack","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/GeometryMetadata.pf","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/InstanceTree.bin","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/LightDefinitions.bin","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/LightList.bin","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/Materials.json.gz","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/objects_attrs.json.gz","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/objects_avs.json.gz","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/objects_ids.json.gz","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/objects_offs.json.gz","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/objects_rcvs.json.gz","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/objects_rcv_offs.json.gz","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/objects_vals.json.gz","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/objects_viewables.json.gz","https://laughing-bartik-c2d22e.netlify.app/assets/models/1/Set.bin"];

let ClientInstance;

addEventListener('message', event => {
    ClientInstance = event.source;
    if (event.data && event.data.action && event.data.action === 'INITIALIZE') {return;}

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

                setTimeout(() => {
                    console.log('The ClientInstance is', ClientInstance)
                    if (!ClientInstance) {return;}
                    ClientInstance.postMessage({action: 'install.complete'})
                }, 2000)

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

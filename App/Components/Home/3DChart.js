// import React, { useRef, useEffect } from 'react';
// import { View } from 'react-native';
// import { GLView } from 'expo-gl';
// import ExpoTHREE, { THREE } from 'expo-three';
// import { Asset } from 'expo-asset';
//
// export default function App() {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
//     const renderer = new ExpoTHREE.Renderer();
//     let model;
//
//     useEffect(() => {
//         const loadModel = async () => {
//             const asset = Asset.fromModule(require('./path/to/your/model.dae'));
//             await asset.downloadAsync();
//
//             const { uri } = asset;
//
//             const loader = new ExpoTHREE.ColladaLoader();
//             model = await loader.loadAsync({ uri });
//             scene.add(model);
//         };
//
//         loadModel();
//     }, []);
//
//     // Set up camera position
//     camera.position.z = 5;
//
//     // Animation function
//     const animate = () => {
//         if (model) {
//             // Rotate the model
//             model.rotation.x += 0.01;
//             model.rotation.y += 0.01;
//         }
//
//         // Render the scene
//         renderer.render(scene, camera);
//         gl.endFrameEXP();
//         requestAnimationFrame(animate);
//     };
//
//     // Start the animation loop
//     animate();
//
//     return (
//         <View style={{ flex: 1 }}>
//             <GLView
//                 style={{ flex: 1 }}
//                 onContextCreate={(gl) => {
//                     renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
//                 }}
//             />
//         </View>
//     );
// }
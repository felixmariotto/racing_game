
/*

CODE FOR TILES :

0 : empty tile
1 : boost tile
2 : obstacle tile

*/

import * as THREE from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

import Scene from './core/Scene.js';

//

const TILE_WIDTH = 1;

const material = new THREE.MeshNormalMaterial();

//

function createMap( params ) {

	const parsed = params.track.reduce( (accu, section, sectionIDX) => {

		return accu.concat( section.map( (tile, tileIDX) => {

			const tileGeom = new THREE.PlaneBufferGeometry( TILE_WIDTH, TILE_WIDTH );

			tileGeom.rotateX( -Math.PI / 2 );
			tileGeom.translate(
				TILE_WIDTH * sectionIDX,
				0,
				TILE_WIDTH * tileIDX
			);

			return tileGeom

		}) )

	}, [] );

	//

	const mergedGeom = BufferGeometryUtils.mergeBufferGeometries( parsed );

	const mesh = new THREE.Mesh(
		mergedGeom,
		material
	)

	mesh.position.z -= TILE_WIDTH * 2;

	Scene.add( mesh )

}

//

export default {
	createMap
}
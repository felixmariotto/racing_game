
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

const TILE_UVS = [

	// ref: 0, 1, 1, 1, 0, 0, 1, 0

	// 0 : empty tile
	[ 0, 0.5, 0.5, 0.5, 0, 0, 0.5, 0 ],

	// 1 : boost tile
	[ 0.5, 0.5, 1.0, 0.5, 0.5, 0, 1.0, 0 ],

	// 2 : obstacle tile
	[ 0, 1.0, 0.5, 1.0, 0, 0.5, 0.5, 0.5 ]

];

let mapMesh;

const material = new THREE.MeshLambertMaterial();

const TILE_SET = 'https://f-zero-racing.s3.eu-west-3.amazonaws.com/images/tile_set.png';
const UV_GRID = 'https://f-zero-racing.s3.eu-west-3.amazonaws.com/images/uv_grid_opengl.jpg';

new THREE.TextureLoader().load( TILE_SET, (texture) => {

	material.map = texture;

});

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

			const uv = tileGeom.attributes.uv.array;

			for ( let i=0 ; i<uv.length ; i++ ) {

				uv[ i ] = TILE_UVS[ tile ][ i ];

			};

			return tileGeom

		}) )

	}, [] );

	//

	const mergedGeom = BufferGeometryUtils.mergeBufferGeometries( parsed );

	mapMesh = new THREE.Mesh(
		mergedGeom,
		material
	)

	Scene.add( mapMesh )

}

//

function cleanup() {

	Scene.remove( mapMesh );

}

//

export default {
	createMap,
	cleanup
}
import { fork, pathFrom } from './_setup.js'

const test = async () => {
	await fork(pathFrom(import.meta.url, './basic.js'))
}

test()

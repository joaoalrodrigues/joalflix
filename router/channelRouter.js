const router = require('express').Router();
const service = require('../service/channelService');

router.get("/:id", function (req, res) {
	const channelId = req.params.id;
	service.getNewChannel(channelId).then((channel) => {
		res.status(200).send(channel);
	}).catch((err) => {
		console.log(err);
		res.status(500).send({ ok: false, message: "O canal não foi encontrado." });
	});
});

router.get("/:id/videos/:lastDate", function (req, res) {
	const params = req.params;
	service.getNewVideos(params.id, params.lastDate).then((videos) => {
		console.log(videos);
		res.status(200).send(videos);
	}).catch((err) => {
		console.log(err);
		res.status(500).send({ ok: false, message: "Não foi possível coletar os vídeos do canal" });
	});
})

module.exports = router;

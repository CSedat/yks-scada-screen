const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:8551/dbLavvar', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Veritabanına Başarıyla Bağlandı");
}).catch((err) => {
    console.log("Veritabanına Bağlanılamadı : " + err);
})

mongoose.connection.on('error', err => {
    console.error(err);
});
const ceviz = new mongoose.Schema({
    id: Number,
    kantar: String,
    dara: String,
    date: String,
    hour: String,
    urun: String,
}, { collection: 'ceviz' });
ceviz.index({ data: 1 });
const Ceviz = mongoose.model('Ceviz', ceviz);

const findik = new mongoose.Schema({
    id: Number,
    kantar: String,
    dara: String,
    date: String,
    hour: String,
    urun: String,
}, { collection: 'findik' });
findik.index({ data: 1 });
const Findik = mongoose.model('Findik', findik);

const toz = new mongoose.Schema({
    id: Number,
    kantar: String,
    dara: String,
    date: String,
    hour: String,
    urun: String,
}, { collection: 'toz' });
toz.index({ data: 1 });
const Toz = mongoose.model('Toz', toz);

const araurun = new mongoose.Schema({
    id: Number,
    kantar: String,
    dara: String,
    date: String,
    hour: String,
    urun: String,
}, { collection: 'araurun' });
araurun.index({ data: 1 });
const Araurun = mongoose.model('Araurun', araurun);

module.exports = {
    Ceviz,
    Findik,
    Toz,
    Araurun,
}
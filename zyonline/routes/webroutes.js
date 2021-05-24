var homePage = require('../controllers/homePage');
module.exports = function (app) {
    app.get('/', homePage.homePage);
    app.get('/homePage', homePage.homePage);
    app.get('/qualificationPage', homePage.qualificationPage);
    app.get('/qualificationPage/occupationalPhysicia', homePage.occupationalPhysicia);
    app.get('/newsSearch', homePage.newsSearch);
    app.get('/phone/newsSearch', homePage.newsSearch_ph);
    app.get('/phone/home', homePage.phone_home);
    app.get('/phone/ph_occupationalPhysicia', homePage.ph_occupationalPhysicia);
    app.get('/phone/ph_occupationalPhysicia/ph_occupationalPhysicia_skill', homePage.ph_occupationalPhysicia_skill);
    app.get('/getNewsListBylabel', homePage.getNewsListBylabel);
}
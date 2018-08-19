module.exports = (req, res) => {
    console.log(req.session);
    if (typeof process.env.ENABLE_DATABASE !== 'undefined' && process.env.ENABLE_DATABASE === 'false') { 
        return render([]);
    }

    var db = require('../../../lib/database')();
    db.query('SELECT * FROM tbluser WHERE tbluser.usertype = 2 AND userid = ?', [req.session.trainer.userid], function(err,results,fields) {
        if (err) return res.send(err);
        render(results);
    });
    
    function render(){
        /* 
         * ikaw na bahala kung saang sub-module ilalagay dashboard ng trainers mo
         * 
         * Example: res.render('trainer/sub-module-name/views/dashboard');
         *
         */
        res.render('trainer/test/dashboard');
    }
}

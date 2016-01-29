

/*
todoItemTable.insert({
    verb: "aller",
    present: "ppp",
    simplepast: "sss"
}).done(function (result) {
    alert(JSON.stringify(result));
}, function (err) {
    alert("Error: " + err);
});
*/


$(document).ready(function () {
    Conjugation.init();

    $("#searchbtn").click(function (e) {
        Conjugation.search($("#searchkey").val());
    });

});

var Conjugation = Conjugation || {
    client: null,
    cjTable: null,

    init: function () {
        client = new WindowsAzure.MobileServiceClient(
            "https://frenchverbs.azure-mobile.net/",
            "KsPMqPHiHrixFqmQTLDRYeiBPFVCJs67"
        );

        cjTable = client.getTable('conjugation');
    },

    search: function (k) {
        var query = cjTable.where({
            verb: k
        }).read().done(function (results) {
            $('#present').html(results[0].present);
            $('#simplepast').html(results[0].simplepast);
        }, function (err) {
            alert("Error: " + err);
        });
    }
}
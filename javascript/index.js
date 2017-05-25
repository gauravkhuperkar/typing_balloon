$(document).ready(function () {
    var words_count = 40;

    var getWords = function (words_count) {
        var words = [];
        for (i = 0; i < words_count; i++) {
            words.push(wordList[Math.floor(Math.random() * wordList.length)]);
        }
        return words;
    };

    var data = getWords(words_count);
    var text_pressed = "";

    $('#start').click(function () {
        $(this).remove();
        showGameContainer();
        floodBalloon();
    });

    $(".type_area").keydown(function (event) {
        text_pressed = $(".type_area").val();

        if ($('.balloon' + text_pressed).length > 0) {
            $('.balloon' + text_pressed).stop();
            $('.balloon' + text_pressed).remove();

            text_pressed = "";
            $(".type_area").val("");
        }
    });

    var balloon_interval;

    var genrateBallon = function (word) {
        var color = generateRandomColor();
        var top = "5%";
        var left = Math.floor(Math.random() * 90) + "%";
        return '<span class="balloons balloon'
            + word
            + '" style="left: '
            + left
            + '; top: '
            + top
            + '; background-color:'
            + color
            + '">'
            + word
            + '</span>'
    };

    var floodBalloon = function () {
        if (data.length == 0)
            clearTimeout(balloon_interval);
        var word = data.pop();

        $('#game_container').append(genrateBallon(word));

        $('.balloon' + word).animate({
            "top": "73%"
        }, 7000, function () {
            $('.balloons').stop();
            clearTimeout(balloon_interval);
            alert("you lost game");
        });

        balloon_interval = setTimeout(floodBalloon, 2000);
    };

    var showGameContainer = function () {
        $("#game_container").removeClass("hidden").addClass("show");
    };

    var generateRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 15)];
        }
        return color;
    }
});

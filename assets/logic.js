$(function () {
    createButtons(topics, 'searchButton', '#buttonsArea')

})

var topics = ['Baseball', 'Football', 'Basketball', 'Soccer', 'Hockey']

function createButtons(topics, classToAdd, areaToAdd) {
    $(areaToAdd).empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', topics[i]);
        a.text(topics[i]);
        $(areaToAdd).append(a);
    }
}

$(document).on('click', '.searchButton', function () {
    $('#searches').empty();
    var type = $(this).data('type');

    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=OLys0LbUO4LNC05dx1fnf7csbFWqXpGF&limit=10';
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .done(function (response) {
            // var xhr = $.get("https://api.giphy.com/v1/gifs/search?q= '+type+' + &api_key=OLys0LbUO4LNC05dx1fnf7csbFWqXpGF&limit=10");
            // xhr.done(function (data) {
            //     console.log(data)

            for (var i = 0; i < response.data.length; i++) {
                console.log(response)
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $('<p>').text('Rating: ' + rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('searchImage');
                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').append(searchDiv);
            }
        });
})

$(document).on('click', '.searchImage', function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');

    }

})


$('#addSearch').on('click', function () {
    event.preventDefault();
    var newSearch = $('input').val().trim();
    topics.push(newSearch);
    createButtons(topics, 'searchButton', '#buttonsArea');
    console.log(newSearch)
})
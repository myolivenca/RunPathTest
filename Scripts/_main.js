$(document).ready(function () {

    $('.jq_isotope').isotope({
        itemSelector: '.iso-item',
        percentPosition: true,
        masonry: {
            // use outer width of grid-sizer for columnWidth
            columnWidth: '.iso-sizer',
            gutter: '.iso-gutter',
        }
    });

});


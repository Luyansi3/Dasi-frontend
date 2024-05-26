$(document).ready(function() {
    $('.star').on('click', function() {
        let rating = $(this).data('value');
        $('#rating').text(rating);
        $('.star').removeClass('selected');
        $(this).addClass('selected');
        $(this).prevAll().addClass('selected');
    });

    $('.star').on('mouseover', function() {
        $('.star').css('color', '#ccc');
        $(this).css('color', 'gold');
        $(this).prevAll().css('color', 'gold');
    });

    $('.star').on('mouseout', function() {
        $('.star').each(function() {
            if (!$(this).hasClass('selected')) {
                $(this).css('color', '#ccc');
            } else {
                $(this).css('color', 'gold');
            }
        });
    });
});

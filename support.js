document_width=window.screen.availWidth;
grid_container_width=0.92*document_width;
cell_side_length=0.18*document_width;
cell_space=0.04*document_width;

function get_pos_top(i,j){
    return cell_space+i*(cell_space+cell_side_length);
}
function get_pos_left(i,j){
    
    return cell_space+j*(cell_space+cell_side_length)
}
function prepare_for_mobile(){
    if(document_width>500){
        grid_container_width=500;
        cell_side_length=100;
        cell_space=20;
    }
    $('#grid_container').css('width', grid_container_width - 2 * cell_space);
    $('#grid_container').css('height', grid_container_width - 2 * cell_space);
    $('#grid_container').css('padding', cell_space);
    $('#grid_container').css('border-radius', 0.02 * grid_container_width);
    $('.grid_cell').css('width', cell_side_length);
    $('.grid_cell').css('height', cell_side_length);
    $('.grid_cell').css('border-radius', 0.02 * grid_container_width);
    
}
function get_number_background_color(number){
    switch(number){
        case 2: return '#eee4da';break;
        case 4: return '#ede0c8';break;
        case 8: return '#f2b179'; break;
        case 16: return '#f59563'; break;
        case 32: return '#f67c5f'; break;
        case 64: return '#f65e3b'; break;
        case 128: return '#edcf72'; break;
        case 256: return '#edcc61'; break;
        case 512: return '#9c0'; break;
        case 1024: return '#33b5e5'; break;
        case 2048: return '#09c'; break;
        case 4096: return '#a6c'; break;
        case 8192: return '#93c'; break;  
                 }
    return 'black';
    
}
function get_number_color(number){
    if(number<=4)
        return '#776e65';
    return 'white';
    
}
function nospace(board){
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}
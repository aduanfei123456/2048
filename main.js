var board=new Array();
var score=0;
var has_conflicted=new Array();
var startx=0;
var starty=0;
var endx=0;
var endy=0;
var success_string='Sucess';
var gameover_string="GameOver";
$(document).ready(function(){
    prepare_for_mobile();
    new_game();
    
    
    
});
function new_game(){
    init();
    generate_one_number();
    generate_one_number();
}
function init(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var grid_cell=$('#grid_cell_'+i+'_'+j);
            grid_cell.css('top',get_pos_top(i,j));
            grid_cell.css('left',get_pos_left(i,j));
        }
        
    }
    for(var i=0;i<4;i++){
        board[i]=new Array();
        has_conflicted[i]=new Array();
        for(var j=0;j<4;j++){
            board[i][j]=0;
            has_conflicted[i][j]=false;
            
        }
    }
    update_board_view();
    score=0;
    update_score(score);
}
function update_board_view(){
    $('.number_cell').remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++)
        {
         $("#grid_container").append(
          '<div class="number_cell" id="number_cell_'+i+'_'+j+'"></div>');
           var number_cell=$("#number_cell_"+i+'_'+j);
            if(board[i][j]==0){
                number_cell.css('width','0px');
                number_cell.css('height','0px');
                }
            else{
                
                number_cell.css('width',cell_side_length);
                number_cell.css('height',cell_side_length);
                number_cell.css('top',get_pos_top(i,j));
                number_cell.css('left',get_pos_left(i,j));
                number_cell.css('background-color',get_number_background_color(board[i][j]));
                number_cell.css('color',get_number_color(board[i][j]));
                number_cell.text(board[i][j]);
            }
            has_conflicted[i][j]=false;
        }
        
        
    }
    $('.number_cell').css('line-height',cell_side_length+'px');
    $('.number_cell').css('font-size',0.4*cell_side_length+'px');
    
}

function generate_one_number(){
    if(nospace(board)){
        return false;
    }
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));
    var time=0;
    while(time<50){
        if(board[randx][randy]==0){
            break;
        }
       randx=parseInt(Math.floor(Math.random()*4));
       randy=parseInt(Math.floor(Math.random()*4));
        time++;
    }
    if(time==50){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]==0){
                    randx=i;
                    randy=j;
                    
                }
                
            }
            
        }
    
    }
    var rand_number=Math.random()<0.5?2:4;
    board[randx][randy]=rand_number;
    show_number_with_animation(randx,randy,rand_number);
    return true;
}
$(document).keydown(function(event){
    if($('#score').text()==success_string){
        new_game();
        return;
        return;
    }switch(event.keyCode){
        case 37:
            event.preventDefault();
            if(move_left()){
                setTimeout('generate_one_number()',210);
                setTimeout('is_gameover()',300);
            }
            break;
         case 38: //up
            event.preventDefault();
            if (move_up()) {
                setTimeout('generate_one_number()', 210);
                setTimeout('is_gameover()', 300);
            }
            break;
        case 39: //right
            event.preventDefault();
            if (move_right()) {
                setTimeout('generate_one_number()', 210);
                setTimeout('is_gameover()', 300);
            }
            break;
        case 40: //down
            event.preventDefault();
            if (move_down()) {
                setTimeout('generate_one_number()', 210);
                setTimeout('is_gameover()', 300);
            }
            break;
        default:
            break;
            
                         }
    
    
});
function is_gameover()
{
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 2048) {
                update_score(success_string);
                return;
            }
        }
    }
    if (nospace(board) && nomove(board)) {
        gameover();
    }
    
}
function move_left(){
    if(!can_move_left(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            console.log(board[i][j]);
            if(board[i][j]!=0){
                for(var k=0;k<j;k++)
                {
                    if(board[i][k]==0&&no_block_horizontal(i,k,j,board))
                        {
                            show_move_animation(i,j,i,k);
                            board[i][k]=board[i][j];
                            board[i][j]=0;
                            break;
                        }
                    else if(board[i][k]==board[i][j]&&no_block_horizontal(i,k,j,board)&&!has_conflicted[i][k])
                        {
                            show_move_animation(i,j,i,k);
                            board[i][k]+=board[i][j];
                            board[i][j]=0;
                            score+=board[i][j];
                            update_score();
                            has_conflicted[i][k]=true;
                            break;
                        }
                }
            }
        }
    }
    setTimeout('update_board_view()',200);
    return true;
}
function move_right()
{
    if(!can_move_right(board))
        return false;
    for(var i=0;i<4;i++)
        {
            for(var j=2;j>=0;j--)
                {   //console.log(board[i][j]);
                    if(board[i][j]!=0)
                    {
                        for(var k=3;k>j;k--)
                            {
                                if(board[i][k]==0&&no_block_horizontal(i,j,k,board)){
                                    show_move_animation(i,j,i,k);
                                    board[i][k]=board[i][j];
                                    board[i][j]=0;
                                    break;
                                }
                    else if((board[i][k]==board[i][j])&&no_block_horizontal(i,j,k,board)&&!has_conflicted[i][k])
                                    {
                                         show_move_animation(i,j,i,k);
                                         board[i][k]+=board[i][j];
                                        board[i][j]=0;
                                        score+=board[i][k];
                                        update_score(score);
                                        has_conflicted[i][k]=true;
                                        break;
                                    }
                            
                    }
                    
                }
        }}
    setTimeout('update_board_view()',200);
    return true;
}
function move_up() {
    if (!can_move_up(board)) {
        return false;
    }
    //move up
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            console.log(board[i][j]);
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && no_block_vertical(j, k, i, board)) {
                        show_move_animation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    } else if (board[k][j] == board[i][j] && no_block_vertical(j, k, i, board) && !has_conflicted[k][j]) {
                        show_move_animation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        update_score(score);
                        has_conflicted[k][j] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout('update_board_view()', 200);
    return true;
}

//向下移动
function move_down() {
    if (!can_move_down(board)) {
        return false;
    }
    //move down
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            console.log(board[i][j]);
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && no_block_vertical(j, i, k, board)) {
                        show_move_animation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    } else if (board[k][j] == board[i][j] && no_block_vertical(j, i, k, board) && !has_conflicted[k][j]) {
                        show_move_animation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        update_score(score);
                        has_conflicted[k][j] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout('update_board_view()', 200);
    return true;    
}
function is_game_over(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++)
            {
                if(board[i][j]==2048)
                    {
                        update_score(success_string);
                        return;
                    }
            }
    }
    if(nospace(board)&&nomove(board)){
        gameover();
    }
}
function gameover(){
    update_score(gameover_string);
}

function can_move_left(board){
    for(var i=0;i<4;i++)
    {
        for(var j=1;j<4;j++)
            {if(board[i][j]!=0)
            {if(board[i][j-1]==0||board[i][j]==board[i][j-1])
                    return true;
            }
    }}
    
return false;    
}
function can_move_right(board){
    for(var i=0;i<4;i++)
        {
            for(var j=2;j>=0;j--)
                {
                    if (board[i][j]!=0)        
                    {
                        if (board[i][j+1]==0||board[i][j]==board[i][j+1])
                            return true;
                    }
                }
            }
    return false;
}
function can_move_up(board)
{
    for(var j=0;j<4;j++)
    {
        for(var i=1;i<4;i++)
            {if(board[i][j]!=0)
                {
                    if(board[i-1][j]==0||board[i][j]==board[i-1][j])
                        return true;
                }
            }
    }
    return false;
}
function can_move_down(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function no_block_horizontal(row,col1,col2,board)
{
    for(var i=col1+1;i<col2;i++)
    {
        if( board[row][i]!=0)
        return false;
    }
    return true;
}
function no_block_vertical(col,row1,row2,board)
{
    for(var i=row1+1;i<row2;i++)
    {
        if(board[i][col]!=0)
            return false;
    }
    return true;
}
function nomove(board){
    if(can_move_left(board)||can_move_right(board)||can_move_down(board)||can_move_up(board))
        return false;
    return true;
}

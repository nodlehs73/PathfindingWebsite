class Node {
    constructor(row, col) {
        this.value = [row, col];
        this.next = null;
    }
}


class Queue {
    constructor () {
        this.front = null;
        this.back = null;
        this.length = 0;
    }

    push (row, col) {
        let new_node = new Node (row, col);
        if (this.length === 0) {
            this.front = new_node;
            this.back = new_node;
        } else {
            this.back.next = new_node;
            this.back = new_node;
        }
        this.length++;
    }

    pop () {
        if (this.length === 1 || this.length === 0) {
            this.front = null;
            this.back = null;
            this.length = 0;
        } else {
            this.front = this.front.next;
            this.length--;
        }
    }

    front () {
        return this.front.value;
    }
}

class lazy_priorityqueue {

    constructor () {
        this.queue = [];
        this.size = 0;
    }
    
    insert (value) {
        this.queue.push (value);
        this.queue.sort ((x, y) => {
            return x[0] - y[0];
        });
        this.queue.reverse ();
        this.size++;
    }

    front () {
        --this.size;
        console.log (this.queue[this.size]);
        return this.queue.pop ();
    }
}

const navigations = document.querySelector ('.algorithms');
const picker = document.querySelectorAll ('.choice');
const dropdown = document.querySelector ('.dropdown');


navigations.addEventListener ('click', () => {
    dropdown.classList.toggle ('hidden');
});

picker.forEach((choice) => {
    choice.addEventListener ('click', (event) => {
        navigations.textContent = event.target.textContent + "▼";
        dropdown.classList.add ('hidden');
    });
});


const grid = document.querySelector ('.grid');

let squares = [];
const ROWS = 28, COLUMNS = 52;
for (let i = 0; i < ROWS; ++i) {
    squares.push (new Array (COLUMNS));
    for (let j = 0; j < COLUMNS; ++j) {
        const square = document.createElement ('div');
        const fill = document.createElement ('div');

        fill.className = 'fill';
        square.className = 'square';
        square.id = `id${i}|${j}`;

        square.appendChild (fill)
        grid.appendChild (square);
        squares[i][j] = square;
    }
}


function remove_borders () {
    for (let i = 0; i < ROWS; ++i) {
        for (let j = 0; j < COLUMNS; ++j) {
            const square = squares[i][j];
            if (i === ROWS - 1 && j === COLUMNS - 1) {
                continue;
            }
            if (i === ROWS - 1) {
                square.style.borderRight = "0";
            } else if (j === COLUMNS - 1) {
                square.style.borderBottom = "0";
            } else {
                square.style.borderRight = "0";
                square.style.borderBottom = "0";
            }
        }
    }
}

let is_mouse_down = false, want_paiting = false, want_removing = false;

function reset_navigation () {
    document.querySelectorAll ('.nav').forEach ((nav) => {
        nav.style.color = 'white';
    });
}

function color_navigation () {
    document.querySelectorAll ('.nav').forEach ((nav) => {
        nav.addEventListener ('click', () => {
            reset_navigation ();
            nav.style.color = 'rgb(100, 255, 100)';
        });
    });
}

function enable_painting () {
    const but = document.querySelector ('.addwalls');
    but.addEventListener ('click', () => {
        want_paiting = true, want_removing = false;
    });
}

function enable_removing () {
    const but = document.querySelector ('.removewalls');
    but.addEventListener ('click', () => {
        want_paiting = false, want_removing = true;
    });
}

function handle_painting_and_removing () {
    document.addEventListener ('mousedown', () => is_mouse_down = true);
    document.addEventListener ('mouseup', () => is_mouse_down = false);
    const button_add = document.querySelector ('.addwalls');
    const button_remove = document.querySelector ('.removewalls');

    document.querySelectorAll ('.square') .forEach (square => {
        square.addEventListener ('mouseenter', () => {
            setTimeout (() => {
                if (is_mouse_down === true) {
                    if (want_paiting === true && button_add.style.color === 'rgb(100, 255, 100)') {
                        square.firstChild.classList.add ('block');
                    }
                    else if (want_removing === true && button_remove.style.color === 'rgb(100, 255, 100)') {
                        square.firstChild.classList.remove ("block");
                    }
                }}, 10);
            
        });  
    });
}




let last_cherry = [], last_pacman = [];

function clear_board () {
    last_cherry = [], last_pacman = [];
    for (let i = 0; i < ROWS; ++i) {
        for (let j = 0; j < COLUMNS; ++j) {
            const square = squares[i][j];

            const fill = document.createElement ('div');
            fill.className = "fill";

            console.log (square.childElementCount);
            square.removeChild (square.firstChild);
            square.appendChild (fill);
        }
    }
}
document.querySelector ('.clear').addEventListener('click', clear_board);

function handle_selecting_start () {
    
    const select_start_button = document.querySelector ('.start');
    
    for (let i = 0; i < ROWS; ++i) {
        for (let j = 0; j < COLUMNS; ++j) {
            const square = squares[i][j];
            square.addEventListener ('click', () => {
                const image = document.createElement ('img');
    
                image.setAttribute ('src', './images/arrow.svg');
                image.classList.add ('image');

                if (select_start_button.style.color !== 'rgb(100, 255, 100)') {
                    return;
                }
                if (last_pacman.length > 0) {
                    const last_square = squares[last_pacman[0]][last_pacman[1]];
                    const child = last_square.firstChild;
                    last_square.removeChild (child);

                    const fill = document.createElement ('div');
                    fill.className = "fill";
                    last_square.appendChild (fill);
                }
                last_pacman = [i, j];
                square.removeChild(square.firstChild);
                square.appendChild (image);
            });
        }
    }
}


function handle_selecting_finish () {

    const image = document.createElement ('img');
    image.setAttribute ('src', './images/flag.svg');
    image.classList.add ('image');

    const select_finish_button = document.querySelector ('.finish');

    for (let i = 0; i < ROWS; ++i) {
        for (let j = 0; j < COLUMNS; ++j) {
            const square = squares[i][j];

            square.addEventListener ('click', () => {
                const image = document.createElement ('img');

                image.setAttribute ('src', './images/flag.svg');
                image.classList.add ('image');

                if (select_finish_button.style.color !== 'rgb(100, 255, 100)') {
                    return;
                }

                if (last_cherry.length > 0) {
                    const fill = document.createElement ('div');
                    fill.className = 'fill';

                    const last_square = squares[last_cherry[0]][last_cherry[1]];

                    last_square.removeChild (last_square.firstChild);
                    last_square.appendChild (fill);
                }
                last_cherry = [i, j];
                square.removeChild (square.firstChild);
                square.appendChild (image);
            }); 
        }
    }
}

const dx = [1, 0, -1, 0], dy = [0, 1, 0, -1];

function bfs () {

    if (last_cherry.length === 0 || last_pacman.length === 0) {
        return;
    }

    const queue = new Queue ();
    queue.push (last_pacman[0], last_pacman[1]);

    const visited = Array.from (new Array (ROWS), (x) => new Array (COLUMNS).fill (0));
    visited[last_pacman[0]][last_pacman[1]] = 1;
    squares[last_pacman[0]][last_pacman[1]].firstChild.classList.add("visit");

    for (let i = 0; i < ROWS; ++i) {
        for (let j = 0; j < COLUMNS; ++j) {
            if (squares[i][j].firstChild.className === "fill block") {
                visited[i][j] = 1;
            }
        }
    }

    let found = 0, iter = 0;
    while (queue.length > 0  && found === 0) {
        const cell = queue.front.value;
        queue.pop ();
        let i = cell[0], j = cell[1];
        iter++;

        setTimeout(() => squares[i][j].firstChild.classList.add ("visit"), iter * 20);
        
        for (let k = 0; k < 4 && found === 0; ++k) {
            let new_i = i + dx[k], new_j = j + dy[k];
            if (new_i >= 0 && new_i < ROWS && new_j >= 0 && new_j < COLUMNS && visited[new_i][new_j] == 0) {
                const square = squares[new_i][new_j];
                if (square.firstChild.classList.length !== 2) {
                    queue.push (new_i, new_j);
                    visited[new_i][new_j] = 1;

                    if (new_i === last_cherry[0] && new_j === last_cherry[1]) {
                        setTimeout (() => squares[new_i][new_j].firstChild.classList.add( "visit"), (iter + 4) * 20);
                        found = 1;
                    }
                }
            }
        }
    }
}

let dfs_iteration = 0, stop_dfs = 0;

function dfs (visited, row, col) {
    if (row < 0 || row >= ROWS || col < 0 || col >= COLUMNS || visited[row][col] === 1 || stop_dfs === 1) {
        return;
    }
    ++dfs_iteration;
    visited[row][col] = 1;

    setTimeout (() => squares[row][col].firstChild.classList.add ('visit'), dfs_iteration * 20);

    if (row === last_cherry[0] && col === last_cherry[1]) {
        stop_dfs = 1;
    }

    dfs (visited, row + 1, col);
    dfs (visited, row, col + 1);
    dfs (visited, row - 1, col);
    dfs (visited, row, col - 1);
}

function call_dfs () {
    if (last_pacman.length === 0 || last_cherry.length === 0) {
        return;
    }

    const visited = Array.from (new Array (ROWS), (x) => new Array (COLUMNS).fill (0));
    for (let i = 0; i < ROWS; ++i) {
        for (let j = 0; j < COLUMNS; ++j) {
            if (squares[i][j].firstChild.classList.length === 2) {
                visited[i][j] = 1;
            }
        }
    }

    dfs (visited, last_pacman[0], last_pacman[1]);
}

function a_star_search () {

    if (last_pacman.length === 0 || last_cherry.length === 0) {
        return;
    }
    function get_manhattan_to_destination (row, col) {
        return Math.abs (row - last_cherry[0]) + Math.abs (col - last_cherry[1]);
    }

    const cost = Array.from (new Array (ROWS), (x) => new Array(COLUMNS).fill (0));
    const blocked = Array.from (new Array (ROWS), (x) => new Array(COLUMNS).fill (0));
    for (let i = 0; i < ROWS; ++i) {
        for (let j = 0; j < COLUMNS; ++j) {
            cost[i][j] = 100000000;
            if (squares[i][j].firstChild.classList.length === 2) {
                blocked[i][j] = 1;
            }
        }
    }
    let iteration = 0;
    let priority_queue = new lazy_priorityqueue ();
    priority_queue.insert ([get_manhattan_to_destination (last_pacman[0], last_pacman[1]), 0, last_pacman[0], last_pacman[1]]);
    while (priority_queue.size > 0) {
        console.log (1);
        let top = priority_queue.front ();
        let cost_to_here = top[1], row = top[2], col = top[3], tot_cost = top[0];
        

        if (tot_cost >= cost[row][col]) {
            continue;
        }
        cost[row][col] = tot_cost;
        iteration++;
        setTimeout (() => squares[row][col].firstChild.classList.add ('visit'), iteration * 20);
        
        if (row === last_cherry[0] && col === last_cherry[1]) {
            break;
        }

        for (let k = 0; k < 4; ++k) {
            let new_row = row + dx[k], new_col = col + dy[k];
            if (new_row >= 0 && new_row < ROWS && new_col >= 0 && new_col < COLUMNS && blocked[new_row][new_col] === 0) {
                priority_queue.insert ([get_manhattan_to_destination (new_row, new_col) + cost_to_here + 1, cost_to_here + 1, new_row, new_col]);
                
            }
        }
    }
}



function start_visualization () {
    let map_algo = new Map();
    map_algo.set ('e', call_dfs);
    map_algo.set ('*', a_star_search);
    map_algo.set ('r', bfs);

    const algoes = document.querySelectorAll ('li');
    const algo = document.querySelector ('.algorithms');

    algoes.forEach ( (algorithm) => {
        algorithm.addEventListener ('click', () => {
            algo.firstChild.textContent = algorithm.textContent + " ▼";
        });
    });

    const visualize_button = document.querySelector ('.visualize');


    visualize_button.addEventListener ('click', () => {
        const wanted_algo = algo.firstChild.textContent.trim ();
        console.log (wanted_algo[1]);
        if (map_algo.has (wanted_algo[1])) {
            map_algo.get (wanted_algo[1])(); 
        }
    });
}

function get_saved_board () {
    const board = JSON.parse (localStorage.getItem ('grid'));
    if (board) {
        for (let i = 0; i < ROWS; ++i) {
            for (let j = 0; j < COLUMNS; ++j) {
                const square = document.getElementById (`id${i}|${j}`);
                square.removeChild (square.firstChild);
               

                if (board[i][j] === 0) {
                    const div = document.createElement ('div');
                    div.className = "fill"; 
                    square.appendChild (div);
                } else if (board[i][j] === 1) {
                    const div = document.createElement ('div');
                    div.className = "fill"; 
                    div.classList.add ('block');
                    square.appendChild (div);
                } else if (board[i][j] === 2) {
                    const div = document.createElement ('div');
                    div.className = "fill"; 
                    div.classList.add ('visit');
                    square.appendChild (div);
                } else if (Math.abs (board[i][j]) === 3) {
                    const img = document.createElement ('img');
                    img.setAttribute ('src', './images/arrow.svg');
                    img.classList.add ('image');
                    last_pacman = [i, j];

                    if (board[i][j] < 0) {
                        img.classList.add ('visit');
                    }

                    square.appendChild (img);
                } else {
                    const img = document.createElement ('img');
                    img.setAttribute ('src', './images/flag.svg');
                    img.classList.add ('image');
                    // img.className = "fill";
                    last_cherry = [i, j];

                    if (board[i][j] < 0) {
                        img.classList.add ('visit');
                    }

                    square.appendChild (img);
                }
            }
        }
    }
}


function save_grid_state () {
   


    // 0 -> empty
    // 1 -> blocked
    // 2 -> visited
    // 3 -> pacman
    // 4 -> cherry

    setInterval (() => {
        const saved_grid = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0));
        for (let i = 0; i < ROWS; ++i) {
            for (let j = 0; j < COLUMNS; ++j) {
                const id = `id${i}|${j}`;
                const square = document.getElementById(`${id}`);
                const state = square.firstChild;

                const classList = state.classList;
                console.log (state.tagName);
                if (state.tagName === "IMG") {
                    const image_path = state.getAttribute ('src');
                    const image_letter = image_path[image_path.length - 5];
                    console.log (state.className);
                    if (image_letter === 'g') {

                        saved_grid[i][j] = 4 * (classList.length === 1 ? 1 : -1);
                    } else {
                        saved_grid[i][j] = 3 * (classList.length === 1 ? 1 : -1);
                    }
                    // console.log (saved_grid[i][j], state.className);
                } else {
                    const style = getComputedStyle (state);
                    // console.log (style.backgroundColor, style.top);

                    if (style.backgroundColor === 'rgb(0, 255, 255)' && style.top === "0px") {
                        saved_grid[i][j] = 2;
                    } else if (style.backgroundColor === 'rgb(52, 73, 94)' && style.top === '0px') {
                        saved_grid[i][j] = 1;
                    }
                }
                
            }
        }
        console.log (JSON.stringify (saved_grid));
        // console.log (JSON.parse (localStorage.getItem ('grid')));
        localStorage.setItem ('grid', JSON.stringify (saved_grid));
    }, 2000);
}


remove_borders ();

color_navigation ();
enable_painting ();
enable_removing ();

handle_painting_and_removing();

handle_selecting_start ();

handle_selecting_finish ();

start_visualization ();

get_saved_board ();
save_grid_state ();
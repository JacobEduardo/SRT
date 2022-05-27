Main();

function Main() {
    var fs = require("fs");

    fs.readdir('./', (error, files) => {
        if (error) {
            throw error;
        }
        console.log(files);

        var archivo_srt_1 = fs.readFileSync('./uno.txt', 'UTF-8');

        var archivo_srt_2 = fs.readFileSync('./dos.txt', 'UTF-8');

        CombineSubtitles(archivo_srt_1,archivo_srt_2);

    });

}

function CombineSubtitles (srt1, srt2){

    var one = Clean(srt1);
    var two = Clean(srt2)
    flag = 0;
    flag2 = 0;
    n1 = 0;
    n2 = 0;
    n3 = 0;
    arr = [];
    var time_srt1;
    var time_srt2;

    while (flag == 0) {
        time_srt1 = GetTime(one[n1]);
        time_srt2 = GetTime(two[n2]);

        if(n2 == two.length - 1){
            flag = 1;
            console.log("cambio");
            while (flag2 == 0){
                n3 = n3 + 1;
                arr[n3] = one[n1];
                n1 = n1 + 1;
                if(n1 == one.length - 1){
                    flag2 = 1;
                }
            }
        }

        if(n1 == one.length - 1){
            flag = 1;
        }

        if (time_srt1 < time_srt2) {
            arr[n3] = one[n1];
            n3 = n3 + 1;
            n1 = n1 + 1;
        } else if (time_srt1 > time_srt2) {
            arr[n3] = two[n2];
            n3 = n3 + 1;
            n2 = n2 + 1;
        } else if (time_srt1 == time_srt2) {
            arr[n3] = one[n1];
            n3 = n3 + 1;
            arr[n3] = two[n2];
            n3 = n3 + 1;
            n1 = n1 + 1;
            n2 = n2 + 1;
        }
        console.log(arr);
        if(n3 == 3){
            flag = 0;
        }
    }

}

function Clean (srt){
    //inserte codigo para eliminar los primeros enter XD
    srt1_arr = srt.split(/\n\s*\n/);

    var n = 0;
    var array1 = [];
    srt1_arr.forEach(element => {
        num = element.indexOf("\n");
        element = element.substring(num + 1);

        num = element.indexOf("\n");

        uno = element.substring(0 , num);

        dos = element.substring(num + 1);
        dos = dos.replace(/(\r\n|\n|\r)/gm, " ")
        tres =  uno + "\n" + dos;

        array1[n] = tres;

        n = n + 1;
    });

    return array1;
}

function GetTime(srt){
    var h = srt.substring(0,2);
    h = h * 60 * 60;
    var m = srt.substring(3,5);
    m = m * 60;
    var s = srt.substring(6,12);
    s = s.replace(",",".");

    time = h + m + s;
    return time;
}

function CheckLong (arr){
    arr.length();
}
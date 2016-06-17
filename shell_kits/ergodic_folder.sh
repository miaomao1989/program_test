#!/bin/sh


# recursively retrieve the subdirectory of a designated directory

#list_alldir() {
#    for file2 in `ls -a $1`
#    do 
#        if [ x"$file2" != x"." -a x"$file2" != x".." ]
#        then
#            if [ -d "$1/$file2" ]
#            then
#                echo "$1/$file2"
#                list_alldir "$1/$file2"
#            fi
#        fi
#    done
#}

function scandir()
{
    local cur_dir parent_dir work_dir
    work_dir=$1
    cd ${work_dir}
    if [ ${work_dir} = "/" ]
    then 
        cur_dir=""
    else
        cur_dir=$(pwd)
    fi

    for dir_list in $(ls ${cur_dir} )
    do 
        if test -d ${dir_list};then
            cd ${dir_list}
            scandir ${cur_dir}/${dir_list}
            cd ..
        else
            echo ${cur_dir}/${dir_list}
            pcs sync ${cur_dir}/{dir_list} 
        fi
    done
}


if test -d $1
then
    scandir $1
elif test -f $1
then
    echo "you input a file, but not a directory; pls reinput and try again"
    exit 1
else
    echo "the directory doesn't exist! Pls input a new one!"
    exit 1
fi

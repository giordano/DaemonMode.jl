var documenterSearchIndex = {"docs":
[{"location":"guide/#User-Guide","page":"User Guide","title":"User Guide","text":"","category":"section"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"This package has been developed taking in account the usage easily.","category":"page"},{"location":"guide/#Usage","page":"User Guide","title":"Usage","text":"","category":"section"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"The server is the responsible of running all julia scripts.","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"  julia -e 'using DaemonMode; serve()'","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"A client, that send to the server the file to run, and return the output obtained.","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"  julia -e 'using DaemonMode; runargs()' program.jl <arguments>","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"you can use an alias ","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"  alias juliaclient='julia -e \"using DaemonMode; runargs()\"'","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"then, instead of julia program.jl you can do juliaclient program.jl. The output should be the same, but with a lot less time.","category":"page"},{"location":"guide/#Running-specific-code","page":"User Guide","title":"Running specific code","text":"","category":"section"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"Although the function runargs() is the simpler way to run the client, it is not the only function.","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"","category":"page"},{"location":"guide/#Typical-errors","page":"User Guide","title":"Typical errors","text":"","category":"section"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"Error, cannot connect with server. Is it running?","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"It could not be connected with the server, you should check it is running, and that the port used in both is the same one.","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"ERROR: could not open file '<file>'","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"the file cannot be found by the server. Remember that the file is going to be searched using as current directory the directory in which the julia client is run.","category":"page"},{"location":"guide/#Changing-the-port","page":"User Guide","title":"Changing the port","text":"","category":"section"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"By default the DaemonMode work in the port 3000, but in many contexts that port can be unavailable, or been busy for another application.","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"it is simple to change the port, but it must be done both in the server and the client.","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"In the server:","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"   using DaemonMode: serve\n\n   serve(port=9000)","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"In the client:","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"   using DaemonMode: runargs\n\n   runargs(port=9000)","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"or using the alias:","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"  alias juliaclient='julia -e \"using DaemonMode; runargs(port=9000)\"'","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"That port keyword can be add to any other parameter.","category":"page"},{"location":"guide/#Different-contexts","page":"User Guide","title":"Different contexts","text":"","category":"section"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"In order to avoid conflict of different versions of the same library, sometimes it is needed to run programs using different contexts  or environments.","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"This can be achieve with DaemonMode run different servers, each one using a different port.","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"# server1.jl\nusing Pkg\nPkg.activate(\"<env_dir1>\")\nusing DaemonMode: serve\nserve(3001)","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"# server2.jl\nusing Pkg\nPkg.activate(\"<env_dir2>\")\nusing DaemonMode: serve\nserve(3002)","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"First, we run the two servers:","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"> julia server1.jl &\n> julia server2.jl &","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"Then, to run file1.jl in the first context and run file2.jl in second environment.","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"julia -e 'using DaemonMode; runargs(3001)' file1.jl","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"julia -e 'using DaemonMode; runargs(3002)' file1.jl","category":"page"},{"location":"guide/#Shared-code-and-Conflict-of-names","page":"User Guide","title":"Shared code and Conflict of names","text":"","category":"section"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"By default each file/expression is run in a new Module to avoid any conflict of names. This implies that each run is completely independently. ","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"It is possible to run the different files/expressions in the same Module, using the parameter shared to true in the function serve(). This implies that the variables are shared between the different clients. It could be useful to avoid repeating evaluations, but it could produce conflict of names.","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"julia -e 'using DaemonMode; runargs(3001)' file1.jl","category":"page"},{"location":"guide/#Debugging-a-script","page":"User Guide","title":"Debugging a script","text":"","category":"section"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"Sometimes the script is not lack of errors, in this case, it is only show the first line of error.","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"By example:","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"function fun2(a)\n    println(a+b)\nend\n\nfunction fun1()\n    fun2(4)\nend\n\nfun1()","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"and the server:","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"julia --project -e 'using DaemonMode; serve(3000)'","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"The output usually should be:","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"# julia --project=. -e \"using DaemonMode; runargs()\" test/bad.jl \nLoadError: syntax: incomplete: premature end of input\nin expression starting at string:1","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"This is usually not wanted. ","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"In order to fix it, and to receive more informative messages, it is recommended the parameter print_stack:","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"julia --project -e 'using DaemonMode; serve(3000, print_stack=true)'","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"When it is run the code now more informative messages:","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"# julia --project=. -e \"using DaemonMode; runargs()\" test/bad2.jl \nLoadError: UndefVarError: b not defined\nStacktrace:\n [1] fun2(::Int64) at ./string:2\n [2] fun1() at ./string:6\n [3] top-level scope at string:9\n [4] include_string(::Function, ::Module, ::String, ::String) at ./loading.jl:1088\n [5] include_string at ./loading.jl:1096 [inlined] (repeats 2 times)\n [6] #7 at /mnt/home/daniel/working/DaemonMode/src/DaemonMode.jl:140 [inlined]\n [7] (::DaemonMode.var\"#3#5\"{DaemonMode.var\"#7#9\"{String},Sockets.TCPSocket,Bool,Bool})() at /mnt/home/daniel/working/DaemonMode/src/DaemonMode.jl:97\n [8] redirect_stderr(::DaemonMode.var\"#3#5\"{DaemonMode.var\"#7#9\"{String},Sockets.TCPSocket,Bool,Bool}, ::Sockets.TCPSocket) at ./stream.jl:1150\n [9] #2 at /mnt/home/daniel/working/DaemonMode/src/DaemonMode.jl:88 [inlined]\n [10] redirect_stdout(::DaemonMode.var\"#2#4\"{DaemonMode.var\"#7#9\"{String},Sockets.TCPSocket,Bool,Bool}, ::Sockets.TCPSocket) at ./stream.jl:1150\n [11] serverRun at /mnt/home/daniel/working/DaemonMode/src/DaemonMode.jl:87 [inlined]\n [12] #6 at /mnt/home/daniel/working/DaemonMode/src/DaemonMode.jl:139 [inlined]\n [13] cd(::DaemonMode.var\"#6#8\"{Sockets.TCPSocket,Bool,Bool,String}, ::String) at ./file.jl:104\n [14] serverRunFile(::Sockets.TCPSocket, ::Bool, ::Bool) at /mnt/home/daniel/working/DaemonMode/src/DaemonMode.jl:137\n [15] serve(::Int64, ::Missing; print_stack::Bool) at /mnt/home/daniel/working/DaemonMode/src/DaemonMode.jl:40\n [16] top-level scope at none:1\n [17] eval(::Module, ::Any) at ./boot.jl:331\n [18] exec_options(::Base.JLOptions) at ./client.jl:272\n [19] _start() at ./client.jl:506\nin expression starting at string:9","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"Obviously, the majority of the complete stack mention the DaemonMode functions, but at least the error can be identified more easily.","category":"page"},{"location":"guide/#Including-a-file","page":"User Guide","title":"Including a file","text":"","category":"section"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"In first versions of the package, you cannot use the \"include\" function to include the code of an external file (for a better organization of the code). This has been solved, so now you can use include function as normal.","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"Example:","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"In file include_test.jl:","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"include(\"to_include.jl\")\n\nprintln(f_aux(2,3))","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"and in to_include.jl:","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"function f_aux(a,b)\n    return a*b\nend","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"# julia --project=. -e \"using DaemonMode; runargs()\" include_test.jl \n6","category":"page"},{"location":"guide/","page":"User Guide","title":"User Guide","text":"Remember that the current directory is the directory in which julia command is run, so it is recommended to run in the same directory that the script with the include.","category":"page"},{"location":"posibilities/#Posibilities","page":"Posibilities","title":"Posibilities","text":"","category":"section"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"This package allow users to run its source code a lot faster. However, you could have doubts about the limitations of running a script through DaemonMode. ","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"This section is to prove you that you can do more than expected.","category":"page"},{"location":"posibilities/#Error-Stack","page":"Posibilities","title":"Error Stack","text":"","category":"section"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"Current version of Daemon can show the Error Stack in a very similar way than using directly julia. ","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"Colors: The message error is remarked using Crayons.jl. \nNumber of calls: The calls due to DaemonMode are hidden, to improve  the readibility.","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"For instance, with the following file bad.jl:","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"function fun2(a)\n    println(a+b)\nend\n\nfunction fun1()\n    fun2(4)\nend\n\nfun1()","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"Directly with julia:","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"$ julia bad.jl\nERROR: LoadError: UndefVarError: b not defined\nStacktrace:\n [1] fun2(::Int64) at /mnt/home/daniel/working/DaemonMode/test/bad.jl:2\n [2] fun1() at /mnt/home/daniel/working/DaemonMode/test/bad.jl:6\n [3] top-level scope at /mnt/home/daniel/working/DaemonMode/test/bad.jl:9\n [4] include(::Function, ::Module, ::String) at ./Base.jl:380\n [5] include(::Module, ::String) at ./Base.jl:368\n [6] exec_options(::Base.JLOptions) at ./client.jl:296\n [7] _start() at ./client.jl:506\nin expression starting at /mnt/home/daniel/working/DaemonMode/test/bad.jl:9","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"or in color: (Image: Results with julia)","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"with DaemonMode it gaves:","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"$ julia -e 'using DaemonMode; runargs()' bad.jl\nERROR: LoadError: UndefVarError: b not defined\nStacktrace:\n [1] fun2 at /mnt/home/daniel/working/DaemonMode/test/bad.jl:2\n [2] fun1 at /mnt/home/daniel/working/DaemonMode/test/bad.jl:6\n [3] top-level scope at /mnt/home/daniel/working/DaemonMode/test/bad.jl:9","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"or in color:","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"(Image: Results with jclient)","category":"page"},{"location":"posibilities/#Logging","page":"Posibilities","title":"Logging","text":"","category":"section"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"The script can use Logging. There are two situations:","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"The messages are written to a external file. \nThe messages are written to console. ","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"Both situations are working nicely. For instance, for the file test_log1.jl:","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"using  Logging, LoggingExtras\n\nfunction msg()\n    @warn \"warning 1\\nanother line\\nlast one\"\n    @error \"error 1\"\n    @info \"info 1\"\n    @debug \"debug 1\"\nend\n\nmsg()","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"running directly with julia:","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"$ julia test_log1.jl\n┌ Warning: warning 1\n│ another line\n│ last one\n└ @ Main ~/working/DaemonMode/test/test_log1.jl:4\n┌ Error: error 1\n└ @ Main ~/working/DaemonMode/test/test_log1.jl:5\n[ Info: info 1","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"while in color:","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"(Image: Logging with julia)","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"running with client:","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"$ juliaclient test_log1.jl\n Warning: warning 1\n│ another line\n│ last one\n└ @ Main /mnt/home/daniel/working/DaemonMode/test/test_log1.jl: 4\n┌ Error: error 1\n└ @ Main /mnt/home/daniel/working/DaemonMode/test/test_log1.jl: 5\n┌ Info: info 1\n└ @ Main /mnt/home/daniel/working/DaemonMode/test/test_log1.jl: 6\n┌ Debug: debug 1\n└ @ Main /mnt/home/daniel/working/DaemonMode/test/test_log1.jl: 7","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"or in color:","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"(Image: Logging with jclient)","category":"page"},{"location":"posibilities/#Return-code","page":"Posibilities","title":"Return code","text":"","category":"section"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"juliaclient defined as:","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"alias juliaclient='julia –startup-file=no -e \"using DaemonMode; runargs()\"'","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"return ","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"0 if the script runs without any problem.\n1 if there is any unexpected problem.","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"By example:","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"$ jclient hello.jl \nHello, World!\n$ echo $?\n0\n$ jclient bad.jl \nERROR: LoadError: UndefVarError: b not defined\nStacktrace:\n [1] fun2 at /mnt/home/daniel/working/DaemonMode/test/bad.jl:2\n [2] fun1 at /mnt/home/daniel/working/DaemonMode/test/bad.jl:6\n [3] top-level scope at /mnt/home/daniel/working/DaemonMode/test/bad.jl:9\n\n$ echo $?\n1","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"","category":"page"},{"location":"posibilities/#Async-mode","page":"Posibilities","title":"Async mode","text":"","category":"section"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"By default, the server only run one task each time. With the optional parameter async=true to server, the server run each client in a new client.","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"$  julia -e 'using DaemonMode; serve(async=true)'","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"This have several advantages:","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"You can run any new client without waiting the previous close.\nIf one process ask for close the Daemon, it will wait until all clients have been finished.","category":"page"},{"location":"posibilities/","page":"Posibilities","title":"Posibilities","text":"The main drawback is that the output can be send to the last task. We are   working on that. ","category":"page"},{"location":"reference/#Index","page":"Public API","title":"Index","text":"","category":"section"},{"location":"reference/","page":"Public API","title":"Public API","text":"","category":"page"},{"location":"reference/#serve","page":"Public API","title":"For the server","text":"","category":"section"},{"location":"reference/","page":"Public API","title":"Public API","text":"DaemonMode.serve(port=3000, shared=false)","category":"page"},{"location":"reference/#DaemonMode.serve","page":"Public API","title":"DaemonMode.serve","text":"serve_sync(port=3000, shared=false, print_stack=true, async=false)\n\nRun the daemon, running all files and expressions sended by the client function.\n\nOptionals\n\nport: port to listen (default=3000).\nshared: Share the environment between calls. If it is false (default) each run has its own environment, so the variables/functions are not shared.\nprint_stack: Print the complete stack when there is an error. By default it is true.\nasync: Run the clients in different clients, Experimental.\n\n\n\n\n\n","category":"function"},{"location":"reference/#For-the-client","page":"Public API","title":"For the client","text":"","category":"section"},{"location":"reference/","page":"Public API","title":"Public API","text":"runargs()\nrunfile(fname::AbstractString)\nrunexpr(expr::AbstractString)\nsendExitCode()","category":"page"},{"location":"reference/#DaemonMode.runargs-Tuple{}","page":"Public API","title":"DaemonMode.runargs","text":"runargs(port=PORT)\n\nAsk the server to run all files in ARGS.\n\nOptionals\n\nport: Port of the server to ask (default=3000).\n\n\n\n\n\n","category":"method"},{"location":"reference/#DaemonMode.runfile-Tuple{AbstractString}","page":"Public API","title":"DaemonMode.runfile","text":"runfile(fname::AbstractString)\n\nAsk the server to run a specific filename.\n\nParameters\n\nfname: Filename to run.\n\nOptionals\n\nargs: List of arguments (array of String, default=[]).\nport: Port (default=3000)\noutput: stream in which it is shown the output of the run.\n\n\n\n\n\n","category":"method"},{"location":"reference/#DaemonMode.runexpr-Tuple{AbstractString}","page":"Public API","title":"DaemonMode.runexpr","text":"runexpr(expr::AbstractString)\n\nAsk the server to run julia code in a string pass as parameters.\n\nParameters\n\nexpr: Julia code to run in the server.\n\nOptionals\n\nport: Port (default=3000).\noutput: stream in which it is shown the output of the run.\n\n\n\n\n\n","category":"method"},{"location":"reference/#DaemonMode.sendExitCode-Tuple{}","page":"Public API","title":"DaemonMode.sendExitCode","text":"sendExitCode(port)\n\nsend the exit code, it closes the server.\n\nOptionals\n\nport: port to connect (default=3000).\n\n\n\n\n\n","category":"method"},{"location":"","page":"Quick Start","title":"Quick Start","text":"CurrentModule = DaemonMode","category":"page"},{"location":"#Introduction","page":"Quick Start","title":"Introduction","text":"","category":"section"},{"location":"","page":"Quick Start","title":"Quick Start","text":"Julia is a great language, but the Just-in-Time compiler implies that loading a package could takes a considerable time, this is called the first plot problem. ","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"It is true that this time is only required for the first time (and there are options, like using and the package Revise). However, it is a great disadvantage when we want to use Julia to create small scripts.","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"This package solve that problem. Inspired in the daemon-mode of Emacs, this package create a server/client model. This allow julia to run scripts a lot quickly scripts in Julia, because the package is maintained in memory between the run of several scripts (or run the same script several times).","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"note: Note\nThis package has been mentioned in JuliaCon 2020, Thank you, Fredrik Ekre!(Image: DaemonMode in JuliaCon)","category":"page"},{"location":"#Usage","page":"Quick Start","title":"Usage","text":"","category":"section"},{"location":"","page":"Quick Start","title":"Quick Start","text":"The server is the responsible of running all julia scripts.","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"  julia -e 'using DaemonMode; serve()'","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"A client, that send to the server the file to run, and return the output obtained.","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"  julia -e 'using DaemonMode; runargs()' program.jl <arguments>","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"you can use an alias ","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"  alias juliaclient='julia -e \"using DaemonMode; runargs()\"'","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"then, instead of julia program.jl you can do juliaclient program.jl. The output should be the same, but with a lot less time.","category":"page"},{"location":"#Process","page":"Quick Start","title":"Process","text":"","category":"section"},{"location":"","page":"Quick Start","title":"Quick Start","text":"The process is the following:","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"The client process sends the program program.jl with the required arguments to the server.\nThe server receives the program name, and run it, returning the output to the client process. \nThe client process receives the output and show it to the console.","category":"page"},{"location":"#Example","page":"Quick Start","title":"Example","text":"","category":"section"},{"location":"","page":"Quick Start","title":"Quick Start","text":"Supose that we have the script test.jl","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"using CSV, DataFrames\n\nfname = only(ARGS)\ndf = CSV.File(fname) |> DataFrame\nprintln(first(df, 3))","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"The normal method is:","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"$ time julia test.jl tsp_50.csv\n...\n3×2 DataFrame\n│ Row │ x        │ y          │\n│     │ Float64  │ Float64    │\n├─────┼──────────┼────────────┤\n│ 1   │ 0.420169 │ 0.628786   │\n│ 2   │ 0.892219 │ 0.673288   │\n│ 3   │ 0.530688 │ 0.00151249 │\n\nreal\t0m18.831s\nuser\t0m18.670s\nsys     0m0.476s","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"Only loading the CSV, DataFrames, and reading a simple file takes 18 seconds in my computer (I accept donnations :-)). Every time that you run the program is going to take these 18 seconds. ","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"using DaemonMode:","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"$ julia -e 'using DaemonMode; serve()' &\n$ time juliaclient test.jl tsp_50.csv\n3×2 DataFrames.DataFrame\n│ Row │ x        │ y          │\n│     │ Float64  │ Float64    │\n├─────┼──────────┼────────────┤\n│ 1   │ 0.420169 │ 0.628786   │\n│ 2   │ 0.892219 │ 0.673288   │\n│ 3   │ 0.530688 │ 0.00151249 │\n\nreal\t0m18.596s\nuser\t0m0.329s\nsys\t0m0.318s","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"But next times, it only use:","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"$ time juliaclient test.jl tsp_50.csv\n3×2 DataFrames.DataFrame\n│ Row │ x        │ y          │\n│     │ Float64  │ Float64    │\n├─────┼──────────┼────────────┤\n│ 1   │ 0.420169 │ 0.628786   │\n│ 2   │ 0.892219 │ 0.673288   │\n│ 3   │ 0.530688 │ 0.00151249 │\n\nreal\t0m0.355s\nuser\t0m0.336s\nsys\t0m0.317s","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"A reduction from 18s to 0.3s, the next runs only time a 2% of the original time. ","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"Then you can change the file:","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"using CSV, DataFrames\n\nfname = only(ARGS)\ndf = CSV.File(fname) |> DataFrame\nprintln(last(df, 10))","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"Then, ","category":"page"},{"location":"","page":"Quick Start","title":"Quick Start","text":"$ time juliaclient test2.jl tsp_50.csv\n10×2 DataFrames.DataFrame\n│ Row │ x        │ y        │\n│     │ Float64  │ Float64  │\n├─────┼──────────┼──────────┤\n│ 1   │ 0.25666  │ 0.405932 │\n│ 2   │ 0.266308 │ 0.426364 │\n│ 3   │ 0.865423 │ 0.232437 │\n│ 4   │ 0.462485 │ 0.049489 │\n│ 5   │ 0.994926 │ 0.887222 │\n│ 6   │ 0.867568 │ 0.302558 │\n│ 7   │ 0.475654 │ 0.607708 │\n│ 8   │ 0.18198  │ 0.592476 │\n│ 9   │ 0.327458 │ 0.354397 │\n│ 10  │ 0.765927 │ 0.806685 │\n\nreal\t0m0.372s\nuser\t0m0.369s\nsys\t0m0.300s","category":"page"},{"location":"#Features","page":"Quick Start","title":"Features","text":"","category":"section"},{"location":"","page":"Quick Start","title":"Quick Start","text":"[X] Performance, because packages are maintained in memory. This is especially interesting with common external packages like CSV.jl, DataFrames.jl, ...\n[X] The code is run using the current directory as working directory.\n[X] Robust, if the file has an error, the server continues working (for other scripts, stops for your current one).\n[X] It accepts parameters without problems.\n[X] Run complete file and also specific code.\n[X] Run in multiple modules to avoid conflicts of names.\n[X] logging output in console working nicely.\n[X] Return 1 when an error occurs.\n[X] Multi-threading version (Experimental mode: conflict standard output).","category":"page"},{"location":"#TODO-(features-in-the-roadmap)","page":"Quick Start","title":"TODO (features in the roadmap)","text":"","category":"section"},{"location":"","page":"Quick Start","title":"Quick Start","text":"[ ] Allow to use function exit in client.\n[ ] Fix redirect with several tasks.\n[ ] Update isinteractive() to show that the run is run in a interactive way.\n[ ] Remote version (in which the Server would be in a different computer of the client).\n[ ] Automatic installation of required packages.","category":"page"}]
}

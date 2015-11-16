var IPython = (function (IPython) {
    $(document).ready(function() {
        var env_changed = function(data){
            var executable = $('#envselector').find(':selected').attr('value');
            IPython.notebook.session.delete();
            var url = window.location.protocol + "//" + window.location.host + window.location.pathname + "?kernel_exe=";
            url = url + executable;
            window.location = url;
        }
        var render_env_selector = function(data){
            $('#envlabel').remove();
            $('#envselector').remove();
            $('#maintoolbar-container').append("<label id='envlabel'>Env:</label>")
            $('#maintoolbar-container').append("<select id='envselector'></select>")
            var current_env = IPython.notebook.env
            data.envs.forEach(function(env){
                var env_name = env.env_name
                var executable = env.executable
                if (env_name === current_env){
                    $('#envselector').append(
                        "<option selected='selected' value='" + 
                            executable + "'>" + env_name + "</option>"
                    );
                }else{
                    $('#envselector').append(
                        "<option value='" + executable + "'>" + env_name + "</option>"
                    );
                }
                
            });
            $('#envselector').change(env_changed);
        }
        var load_env_selector = function(){
            $.ajax("/envs/envlist",
                   {
                       dataType : "json",
                       type : "GET",
                       success : function(data){
                           render_env_selector(data);
                       }
                   });
        }
        $([IPython.events]).on('status_started.Kernel', load_env_selector);
    });
    return IPython
}(IPython));

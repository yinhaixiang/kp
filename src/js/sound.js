(function(){
    var pools = {};
    var resDict = {};
    var sound = {
        pools:pools,
        init:function(){
            var that = this;
            var res = [
                'k0',
                'k1',
                'p0',
                'p1',
                'ready',
                'go',
                'gameover',
                'ready',
                'miss0',
                'miss1'
            ];

            res.forEach(function(id){
                resDict[id] = './src/sound/' + id + '.mp3';
                pools[id] = [];
                var sound = that.get(id);
                pools[id].push(sound);
                sound.load();
            });
        },
        get:function(id){
            var src = resDict[id];
            if(src){
                var pool = pools[id];
                if(pool.length){
                    return pool.pop();
                }
                else{
                    var sound = new Hilo.WebAudio({
                        src:src
                    });
                    sound.on('end', function(){
                        pool.push(sound);
                    });
                    return sound;
                }
            }
        },
        play:function(id, vol){
            var sound = this.get(id);
            if(sound){
                sound.setVolume(vol||1);
                sound.play();
            }
        },
        plays:function(arr){
            var that = this;
            var preSound;
            arr.forEach(function(id){
                var sound = that.get(id);
                if(preSound){
                    preSound.on('end', function(){
                        sound.play();
                    }, true);
                }
                else{
                    sound.play();
                }
                preSound = sound;
            });
            return preSound;
        }
    };
    window.sound = sound;
})();
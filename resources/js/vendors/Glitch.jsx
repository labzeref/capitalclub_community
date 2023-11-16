import {PowerGlitch} from "powerglitch";

export function init_glitch(){

    PowerGlitch.glitch(
        '.glitch',
        {
            "playMode": "hover",
            "createContainers": true,
            "hideOverflow": false,
            "timing": {
                "duration": 1000
            },
            "glitchTimeSpan": {
                "start": 0.1,
                "end": 0.5
            },
            "shake": {
                "velocity": 10,
                "amplitudeX": 0.02,
                "amplitudeY": 0.04
            },
            "slice": {
                "count": 7,
                "velocity": 20,
                "minHeight": 0.02,
                "maxHeight": 0.15,
                "hueRotate": false
            },
            "pulse": false
        });

}


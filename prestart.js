let prev_time = 0;
let prev_delta = 0;

ig.Input.inject({
    mousewheel(event) {
        let cur_time = Date.now();
        let time_diff = cur_time - prev_time;
        let delta = Math.abs(event.deltaY);

        // Touchpad always has non-decimal delta values, I think?
        let is_touchpad = Number.isInteger(delta);

        if (is_touchpad) {
            // Ignore inertial scrolls, sorta?
            if (time_diff < 100 && delta < 50) return;

            // Ignore slow scrolls
            if (delta < 3) return;
        }

        prev_time = cur_time;
        prev_delta = delta;

        return this.parent(event);
    }
});

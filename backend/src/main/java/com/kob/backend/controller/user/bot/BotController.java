package com.kob.backend.controller.user.bot;

import com.kob.backend.pv.Bot;
import com.kob.backend.service.user.bot.BotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class BotController {
    @Autowired
    private BotService botService;

    @PostMapping("/user/bot/add/")
    public Map<String, String> add(@RequestBody Map<String, String> data) {
        return botService.add(data);
    }

    @PostMapping("/user/bot/remove/")
    public Map<String, String> remove(@RequestBody Map<String, String> data) {
        return botService.remove(data);
    }
    @PostMapping("/user/bot/update/")
    public Map<String, String> update(@RequestBody Map<String, String> data) {
        return botService.update(data);
    }
    @GetMapping("/user/bot/getAllBot/")
    public List<Bot> getAllBot() {
        return botService.getAllBot();
    }
}

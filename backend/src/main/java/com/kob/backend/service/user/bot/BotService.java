package com.kob.backend.service.user.bot;

import com.kob.backend.pv.Bot;

import java.util.List;
import java.util.Map;

public interface BotService {
    Map<String,String> add(Map<String,String> data);

    Map<String,String> remove(Map<String,String> data);

    Map<String,String> update(Map<String,String> data);

    List<Bot> getAllBot();

}

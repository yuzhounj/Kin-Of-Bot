package com.kob.backend.service.impl.user.bot;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.BotMapper;
import com.kob.backend.pv.Bot;
import com.kob.backend.pv.User;
import com.kob.backend.service.impl.utils.UserDetailImpl;
import com.kob.backend.service.user.bot.BotService;
import net.sf.jsqlparser.expression.DateTimeLiteralExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BotServiceImpl implements BotService {
    @Autowired
    BotMapper botMapper;
    @Override
    public Map<String, String> add(Map<String, String> data) {
        UsernamePasswordAuthenticationToken authenticationToken = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetailImpl userDetail = (UserDetailImpl) authenticationToken.getPrincipal();
        User currentUser = userDetail.getUser();
        String title = data.get("title");
        String description = data.get("description");
        String content = data.get("content");


        Map<String,String> result = new HashMap<>();

        if(title == null || title.isEmpty()){
            result.put("error_message","标题不能为空");
            return result;
        }
        if(title.length()>100){
            result.put("error_message","标题长度不能超过100");
            return result;
        }
        if(description == null || description.isEmpty()){
            description = "这个用户很懒，什么都没留下";
        }
        if(description.length()>1000){
            result.put("error_message","描述长度不能超过1000");
            return result;
        }
        if(content == null || content.isEmpty()){
            result.put("error_message","代码内容不能为空");
            return result;
        }
        if(content.length()>10000){
            result.put("error_message","代码内容长度不能超过10000");
            return result;
        }

        Date now= new Date();
        Bot bot = new Bot(null,currentUser.getId(),title,description,content,1500,now,now);

        botMapper.insert(bot);

        result.put("error_message","success");

        return result;

    }

    @Override
    public Map<String, String> remove(Map<String, String> data) {
        UsernamePasswordAuthenticationToken authenticationToken = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetailImpl userDetail = (UserDetailImpl) authenticationToken.getPrincipal();
        User currentUser = userDetail.getUser();
        int botId=Integer.parseInt(data.get("bot_id"));
        Bot bot = botMapper.selectById(botId);
        Map<String,String> result = new HashMap<>();
        if(bot == null){
            result.put("error_message","bot不存在");
            return result;
        }
        if(bot.getUserId()!=currentUser.getId()){
            result.put("error_message","无权限删除");
            return result;
        }
        botMapper.deleteById(botId);
        result.put("error_message","success");
        return result;
    }

    @Override
    public Map<String, String> update(Map<String, String> data) {
        UsernamePasswordAuthenticationToken authenticationToken = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetailImpl userDetail = (UserDetailImpl) authenticationToken.getPrincipal();
        User currentUser = userDetail.getUser();
        int botId=Integer.parseInt(data.get("bot_id"));
        Bot bot = botMapper.selectById(botId);
        Map<String,String> result = new HashMap<>();
        if(bot == null){
            result.put("error_message","bot不存在");
            return result;
        }
        if(bot.getUserId()!=currentUser.getId()){
            result.put("error_message","无权限修改");
            return result;
        }
        String title = data.get("title");
        String description = data.get("description");
        String content = data.get("content");
        Bot newBot= new Bot(botId,currentUser.getId(),title,description,content,bot.getRating(),bot.getCreateTime(),new Date());
        botMapper.updateById(newBot);
        result.put("error_message","success");
        return result;
    }

    @Override
    public List<Bot> getAllBot() {
        UsernamePasswordAuthenticationToken authenticationToken = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetailImpl userDetail = (UserDetailImpl) authenticationToken.getPrincipal();
        User currentUser = userDetail.getUser();
        QueryWrapper<Bot> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id",currentUser.getId());

        return botMapper.selectList(queryWrapper);

    }
}

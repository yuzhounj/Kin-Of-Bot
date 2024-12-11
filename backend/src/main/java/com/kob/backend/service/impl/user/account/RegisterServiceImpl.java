package com.kob.backend.service.impl.user.account;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pv.User;
import com.kob.backend.service.user.account.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    UserMapper userMapper;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Override
    public Map<String,String> register(String username, String password, String confirmPassword) {
        Map<String,String> map=new HashMap<>();
        if(username==null||username.equals("")){
            map.put("error_message","用户名不能为空");
            return map;
        }
        if(password==null||password.equals("")){
            map.put("error_message","密码不能为空");
            return map;
        }
        if(!password.equals(confirmPassword)){
            map.put("error_message","两次密码不一致");
            return map;
        }



        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        List<User> userList = userMapper.selectList(queryWrapper);
        if(!userList.isEmpty()){
            map.put("error_message","用户名已存在");
            return map;
        }
        String encodePassword = passwordEncoder.encode(password);
        String photo = "https://th.bing.com/th/id/OIP.JwSP22S7YovPpZFXuBJ75QHaHa?w=179&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7";
        User user = new User(null,username,encodePassword,photo);
        userMapper.insert(user);
        map.put("error_message","success");
        return map;
    }
}

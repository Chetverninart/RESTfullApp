package com.example.RESTfulApp.controllers;

import com.example.RESTfulApp.models.User;
import com.example.RESTfulApp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("/")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("index")
    public ModelAndView index (Model model, Authentication authentication) {
        User user = (User) userService.loadUserByUsername(authentication.getName());
        model.addAttribute("user", user);
        model.addAttribute("users", userService.getAllUsers());
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index");
        return modelAndView;
    }

    @GetMapping("admin")
    public @ResponseBody List<User> admin() {
        return userService.getAllUsers();
    }

    @GetMapping("user/{id}")
    public @ResponseBody User user(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @GetMapping("user")
    public @ResponseBody User user(Authentication authentication) {
        String username = authentication.getName();
        return (User) userService.loadUserByUsername(username);
    }

    @PostMapping("user/new")
    public void createUser(@RequestBody User user) {

        userService.addUser(user);
    }

    @PatchMapping("user")
    public void updateUser(@RequestBody User user) {
        userService.update(user);
    }

    @DeleteMapping("user")
    public void deleteUser(@RequestBody User user) {

        userService.remove(user.getId());
    }

}
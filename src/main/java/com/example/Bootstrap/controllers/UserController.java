package com.example.Bootstrap.controllers;

import com.example.Bootstrap.models.Role;
import com.example.Bootstrap.models.User;
import com.example.Bootstrap.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;

@Controller
@RequestMapping("/")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "")
    public String startRequest() {
        return "redirect:login";
    }

    @GetMapping(value = "hello")
    public String printWelcome(ModelMap model, Authentication authentication) {
        model.addAttribute("name", "Hello, " + authentication.getName());
        model.addAttribute("role", "You don't have a role");
        return "hello";
    }

    @GetMapping(value = "admin")
    public String adminsPage(Model model, Authentication authentication) {
        User user = (User) userService.loadUserByUsername(authentication.getName());
        model.addAttribute("user", user);
        model.addAttribute("users", userService.getAllUsers());
        return "admin";
    }

    @GetMapping(value = "user")
    public String user(Model model, Authentication authentication) {
        User user = (User) userService.loadUserByUsername(authentication.getName());
        model.addAttribute("user", user);
        return "user";
    }

    @GetMapping("admin/{id}")
    public String singleUser(@PathVariable("id") Long id, Model model) {
        model.addAttribute("user", userService.getUser(id));
        return "edit";
    }

    @PatchMapping("admin/{id}")
    public String update(@ModelAttribute("user") User user, HttpServletRequest request) {
        String[] roles = request.getParameterValues("role");
        List<String> list = Arrays.asList(roles);
        Set<Role> roleSet = new HashSet<>();
        if (list.contains("user") ) {
            Role role1 = new Role();
            role1.setId(1L);
            role1.setName("ROLE_USER");
            roleSet.add(role1);
        }
        if (list.contains("admin")) {
            Role role1 = new Role();
            role1.setId(2L);
            role1.setName("ROLE_ADMIN");
            roleSet.add(role1);
        }
        user.setRoles(roleSet);
        userService.update(user);
        return "redirect:/admin";
    }

    @GetMapping("admin/{id}/edit")
    public String editUser(Model model, @PathVariable("id") Long id) {
        model.addAttribute("user", userService.getUser(id));
        return "edit";
    }

    @GetMapping("admin/new")
    public String newUser(@ModelAttribute("user") User user, Model model, Authentication authentication) {
        User admin = (User) userService.loadUserByUsername(authentication.getName());
        model.addAttribute("admin", admin);
        return "new";
    }

    //@ModelAttribute("userRole") String userRole, @ModelAttribute("adminRole") String adminRole
    @PostMapping("admin/new")
    public String addUser(@ModelAttribute("user") User user, HttpServletRequest request) {
        String[] roles = request.getParameterValues("role");
        List<String> list = Arrays.asList(roles);
        Set<Role> roleSet = new HashSet<>();
        if (list.contains("user") ) {
            Role role1 = new Role();
            role1.setId(1L);
            role1.setName("ROLE_USER");
            roleSet.add(role1);
        }
        if (list.contains("admin")) {
            Role role1 = new Role();
            role1.setId(2L);
            role1.setName("ROLE_ADMIN");
            roleSet.add(role1);
        }
        user.setRoles(roleSet);
        userService.addUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("admin/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.remove(id);
        return "redirect:/admin";
    }

}
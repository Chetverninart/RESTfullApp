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


import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

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
    public String adminsPage(Model model) {
        model.addAttribute("users", userService.getAllUsers());
        return "admin";
    }

    @GetMapping(value = "user")
    public String user(Model model, Authentication authentication) {
        String name = authentication.getName();
        User user = (User) userService.loadUserByUsername(name);
        model.addAttribute("user", user);
        return "user";
    }

    @GetMapping("admin/{id}")
    public String singleUser(@PathVariable("id") Long id, Model model) {
        model.addAttribute("user", userService.getUser(id));
        return "edit";
    }

    @PatchMapping("admin/{id}")
    public String update(@ModelAttribute("user") @Valid User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "edit";
        }
        userService.update(user);
        return "redirect:/admin";
    }

    @GetMapping("admin/{id}/edit")
    public String editUser(Model model, @PathVariable("id") Long id) {
        model.addAttribute("user", userService.getUser(id));
        return "edit";
    }

    @GetMapping("admin/new")
    public String newUser(@ModelAttribute("user") User user) {
        return "new";
    }

    @PostMapping("admin/new")
    public String addUser(@ModelAttribute("user") @Valid User user, BindingResult bindingResult,
                          @ModelAttribute("userRole") String userRole, @ModelAttribute("adminRole") String adminRole) {
        if (bindingResult.hasErrors()) {
            return "new";
        }

        Set<Role> roleSet = new HashSet<>();
        if (userRole.equals("on")) {
            Role role = new Role();
            role.setId(1L);
            role.setName("ROLE_USER");
            roleSet.add(role);
        }
        if (adminRole.equals("on")) {
            Role role = new Role();
            role.setId(2L);
            role.setName("ROLE_ADMIN");
            roleSet.add(role);
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
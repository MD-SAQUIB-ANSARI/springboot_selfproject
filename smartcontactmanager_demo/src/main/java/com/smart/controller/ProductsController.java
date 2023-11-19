package com.smart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.smart.dao.UserRepository;


@Controller
public class ProductsController {
	
	@Autowired
	private UserRepository userRepsitory;
	
	@RequestMapping("/weddingSuite")
	private String weddingSuite(Model model)
	{
		model.addAttribute("title","Collection of wedding Suite model");
		return "weddingSuite";
	
	}
	
	@RequestMapping("/festivalSuite")
	private String festivalSuite(Model model)
	{
		model.addAttribute("title","Collection of festival Suite model");
		return "festivalSuite";
	
	}
	@RequestMapping("/OtherSuite")
	private String OtherSuite(Model model)
	{
		model.addAttribute("title","Collection of Other Suite model");
		return "OtherSuite";
		
	}
	@RequestMapping("/formalSuite")
	private String formalSuite(Model model)
	{
		
		model.addAttribute("title","Collection of formal Suite model");
		return "formalSuite";
	}
	
}

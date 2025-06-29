package com.springtemplate.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.springtemplate.entity.Chat;
import com.springtemplate.entity.Croom;

@Mapper
public interface ChatMapper {
   
   public Croom loadRoom(String p_idx);
   
   public List<Chat> loadChat(Croom croom);
   
   public int sendMessage(Chat chat);
   
}

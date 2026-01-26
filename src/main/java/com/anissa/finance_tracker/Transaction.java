package com.anissa.finance_tracker;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal amount;
    @Enumerated(EnumType.STRING)
    private Category category;
    private LocalDate date;
    @Enumerated(EnumType.STRING)
    private TransactionType type;
    private String description; //optional

    public Transaction(BigDecimal amount, Category category, LocalDate date, TransactionType type) {
        this.amount = amount;
        this.category = category;
        this.date = date;
        this.type = type;
    }

}
